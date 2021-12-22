const { generatorPaths, templatePaths } = require('../constants');
const { camelCase, pascalCase } = require('../utils');
const { exec } = require('child_process');

/**
 *
 * @typedef {import('plop').AddActionConfig} AddActionConfig - Action config plop
 * @typedef {import('plop').PlopGenerator} GeneratorConfig - Generator config plop
 * @typedef {{ name: string }} Data - Prompt props
 */

/**
 * @type {GeneratorConfig}
 */
const generatorConfig = {
  description: 'Create a service',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Service name',
    },
  ],
  actions: (/** @type {Data} */ data) => {
    /**
     * @type {AddActionConfig[]}
     */
    const actions = [
      {
        type: 'add',
        path: `${generatorPaths.services}/{{camelCase name}}/index.ts`,
        templateFile: `${templatePaths.services}/index.ts.hbs`,
      },
      {
        type: 'add',
        path: `${generatorPaths.services}/{{camelCase name}}/types.ts`,
        templateFile: `${templatePaths.services}/types.ts.hbs`,
      },
      {
        type: 'modify',
        path: `${generatorPaths.services}/index.ts`,
        transform: (template, /** @type {Data} */ data) => {
          const exportFile = pascalCase(data.name);
          const fromFile = camelCase(data.name);
          const templateToAppend = `export { default as ${exportFile}Service } from './${fromFile}';`;

          return `${templateToAppend}\n${template}`;
        },
      },
    ];

    actions.push(() => {
      const cmd = `yarn prettier --write src/modules/services/${camelCase(
        data.name,
      )}/*.ts`;
      exec(cmd, (err, result) => {
        if (err) throw err;
        process.stdout.write(result);
      });
      return 'Prettier formatted service file';
    });

    return actions;
  },
};

module.exports = generatorConfig;
