const CracoLessPlugin = require('craco-less');
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const themePath = './src/assets/styles/antd.vars.less';
const themeFile = fs.readFileSync(path.join(__dirname, themePath), 'utf8');
const themeVariables = lessToJs(themeFile);

module.exports = {
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: themeVariables,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
