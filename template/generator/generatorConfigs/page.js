const { generatorPaths, templatePaths } = require('../constants');
const { pascalCase, listPaths } = require('../utils');
const { exec } = require('child_process');

/**
 *
 * @typedef {import('plop').AddActionConfig} AddActionConfig - Action config plop
 * @typedef {import('plop').PlopGenerator} GeneratorConfig - Generator config plop
 * @typedef {{
 *  isParent: boolean;
 *  parentName: string;
 *  name: string;
 *  hasLayout: boolean;
 *  layoutType: 'Public' | 'Private'
 *  hasPageComponent: boolean
 *  }} Data - Prompt props
 */

/**
 * @type {GeneratorConfig}
 */
const generatorConfig = {
  description: 'Create a page',
  prompts: [
    {
      type: 'confirm',
      name: 'isParent',
      message: 'Add the page to a parent?',
      default: false,
    },
    {
      type: 'list',
      name: 'parentName',
      message: 'Select the parent',
      when: (/** @type {Data} */ data) => {
        return data.isParent;
      },
      choices: listPaths('pages'),
    },
    {
      type: 'input',
      name: 'parentName',
      message: 'Parent name',
      askAnswered: true,
      when: (/** @type {Data} */ data) => {
        return data.parentName && data.parentName === '[Create]';
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'Page name',
    },
    {
      type: 'confirm',
      name: 'hasLayout',
      message: 'To use as layout?',
      default: true,
    },
    {
      type: 'list',
      name: 'layoutType',
      message: 'Select the layout',
      when: (/** @type {Data} */ data) => {
        return data.hasLayout;
      },
      choices: ['Public', 'Private'],
    },
    {
      type: 'confirm',
      name: 'hasPageComponent',
      message: 'Would you like to create page component?',
      default: true,
    },
  ],
  actions: (/** @type {Data} */ data) => {
    let parentPath = data.isParent ? '/{{pascalCase parentName}}' : '';

    /**
     * @type {AddActionConfig[]}
     */
    const actions = [
      {
        type: 'add',
        path: `${generatorPaths.pages}${parentPath}/{{pascalCase name}}/index.tsx`,
        templateFile: `${templatePaths.pages}/index.tsx.hbs`,
      },
    ];

    if (!data.isParent) {
      if (data.hasPageComponent) {
        actions.push(
          {
            type: 'modify',
            path: `${generatorPaths.pages}/index.ts`,
            transform: (template, /** @type {Data} */ dataAction) => {
              const exportDefaultName = pascalCase(dataAction.name);
              const fromFileName = pascalCase(dataAction.name);
              const templateToAppend = `export { default as ${exportDefaultName}Page } from './${fromFileName}';`;

              return `${templateToAppend}\n${template}`;
            },
          },
          {
            type: 'modify',
            path: `${generatorPaths.routes}`,
            pattern: /( } from 'pages';\n)+/g,
            template: `, {{pascalCase name}}Page } from 'pages';\n`,
          },
          {
            type: 'modify',
            path: `${generatorPaths.routes}`,
            pattern: /(\n} from 'pages';\n)+/g,
            template: `  {{pascalCase name}}Page\n} from 'pages';\n`,
          },
        );
      }

      actions.push({
        type: 'append',
        path: `${generatorPaths.routes}`,
        pattern: /(routes=\{\[\n)+/g,
        separator: '',
        templateFile: `${templatePaths.pages}/route.hbs`,
      });

      actions.push(() => {
        const cmd = 'yarn prettier --write src/modules/routing/index.tsx';
        exec(cmd, (err, result) => {
          if (err) throw err;
          process.stdout.write(result);
        });
        return 'Prettier formatted routing file';
      });
    }

    return actions;
  },
};

module.exports = generatorConfig;
