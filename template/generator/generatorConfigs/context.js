const { generatorPaths, templatePaths } = require('../constants');
const { pascalCase, camelCase } = require('../utils');
const { exec } = require('child_process');

/**
 *
 * @typedef {import('plop').AddActionConfig} AddActionConfig - Action config plop
 * @typedef {import('plop').PlopGenerator} GeneratorConfig - Generator config plop
 * @typedef {{ name: string; isCombineContext: boolean }} Data - Prompt props
 */

/**
 * @type {GeneratorConfig}
 */
const generatorConfig = {
  description: 'Create a context',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Context name',
    },
  ],
  actions: (/** @type {Data} */ data) => {
    /** @type {AddActionConfig[]} */
    const actions = [
      {
        type: 'add',
        path: `${generatorPaths.contexts}/{{camelCase name}}/index.tsx`,
        templateFile: `${templatePaths.contexts}/index.tsx.hbs`,
      },
      {
        type: 'add',
        path: `${generatorPaths.contexts}/{{camelCase name}}/types.ts`,
        templateFile: `${templatePaths.contexts}/types.ts.hbs`,
      },
      {
        type: 'modify',
        path: `${generatorPaths.contexts}/index.ts`,
        transform: (template, /** @type {Data} */ actionData) => {
          const exportDefaultName = pascalCase(actionData.name);
          const fromFileName = camelCase(actionData.name);
          const templateToAppend = `export { default as ${exportDefaultName}Provider } from './${fromFileName}';`;

          return `${templateToAppend}\n${template}`;
        },
      },
    ];

    actions.push(() => {
      const cmd = `yarn prettier --write src/modules/contexts/${camelCase(
        data.name,
      )}/*.{ts,tsx}`;
      exec(cmd, (err, result) => {
        if (err) throw err;
        process.stdout.write(result);
      });
      return 'Prettier formatted context file';
    });

    return actions;
  },
};

module.exports = generatorConfig;
