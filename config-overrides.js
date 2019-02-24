const { addBabelPlugin, override, fixBabelImports, addLessLoader, addWebpackAlias  } = require('customize-cra');
const path = require('path');

const src=path.resolve(__dirname,'src');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addBabelPlugin(
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    addWebpackAlias({
        '@':src
    })
);
