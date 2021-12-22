const { generatorPaths, templatePaths } = require('../constants');
const { listPaths, pascalCase } = require('../utils');

/**
 *
 * @typedef {import('plop').AddActionConfig} AddActionConfig - Action config plop
 * @typedef {import('plop').PlopGenerator} GeneratorConfig Generator config plop
 * @typedef {{ isParent: boolean; parent: string; parentName?: string; name: string }} Data - Prompt props
 */

/**
 * @type {GeneratorConfig}
 */
const generatorConfig = {
  description: 'Create a component',
  prompts: [
    {
      type: 'confirm',
      name: 'isParent',
      message: 'Add the component to a parent?',
      default: true,
    },
    {
      type: 'list',
      name: 'parent',
      message: 'Select the parent',
      when: (/** @type {Data} */ data) => {
        return data.isParent;
      },
      choices: listPaths('components'),
    },
    {
      type: 'input',
      name: 'parentName',
      message: 'Parent name',
      askAnswered: true,
      when: (/** @type {Data} */ data) => {
        return data.parent && data.parent === '[Create]';
      },
    },
    {
      type: 'input',
      name: 'name',
      message: 'Component name',
    },
  ],
  actions: (/** @type {Data} */ data) => {
    let parentPath = '';

    if (data.isParent) {
      if (data.parentName) {
        parentPath = '/{{pascalCase parentName}}';
      } else {
        parentPath = '/{{pascalCase parent}}';
      }
    }

    const actions = [
      {
        type: 'add',
        path: `${generatorPaths.components}${parentPath}/{{pascalCase name}}/index.tsx`,
        templateFile: `${templatePaths.components}/index.tsx.hbs`,
      },
    ];

    if (data.isParent && data.parent === '[Create]') {
      actions.push(
        {
          type: 'add',
          path: `${generatorPaths.components}${parentPath}/index.ts`,
          template: '',
        },
        {
          type: 'modify',
          path: `${generatorPaths.components}${parentPath}/index.ts`,
          transform: (template, /** @type {Data} */ dataAction) => {
            const exportDefaultName = pascalCase(dataAction.name);
            const fromFileName = pascalCase(dataAction.name);
            const templateToAppend = `export { default as ${exportDefaultName} } from './${fromFileName}';`;

            return `${templateToAppend}\n${template}`;
          },
        },
      );
    }

    if (!data.isParent) {
      actions.push({
        type: 'modify',
        path: `${generatorPaths.components}/index.ts`,
        transform: (template, /** @type {Data} */ dataAction) => {
          const exportDefaultName = pascalCase(dataAction.name);
          const fromFileName = pascalCase(dataAction.name);
          const templateToAppend = `export { default as ${exportDefaultName} } from './${fromFileName}';`;

          return `${templateToAppend}\n${template}`;
        },
      });
    }

    return actions;
  },
};

module.exports = generatorConfig;
