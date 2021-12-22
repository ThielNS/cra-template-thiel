const component = require('./generatorConfigs/component');
const context = require('./generatorConfigs/context');
const hook = require('./generatorConfigs/hook');
const page = require('./generatorConfigs/page');
const service = require('./generatorConfigs/service');

/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
function plopConfig(plop) {
  plop.setGenerator('component', component);
  plop.setGenerator('context', context);
  plop.setGenerator('hook', hook);
  plop.setGenerator('page', page);
  plop.setGenerator('service', service);

  plop.setHelper('isLayout', (layoutType, type) =>
    layoutType === type
      ? `<Layout.${type} pageComponent={{{pascalCase name}}} />`
      : '',
  );
}

module.exports = plopConfig;
