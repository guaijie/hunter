const { addBabelPlugin, override, fixBabelImports, addLessLoader, addWebpackAlias  } = require('customize-cra');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const path = require('path');
const src=path.resolve(__dirname,'src');

let addWebpackPlugin=plugin=>config=>{
    config.plugins.push(plugin);
    return config
}
console.log(new AntDesignThemePlugin({generateOnce:true}))
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
    }),
    addWebpackAlias({
        '@':src
    }),
    // addWebpackPlugin(new AntDesignThemePlugin({indexFileName:false}))
)


