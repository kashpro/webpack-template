const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

console.log(process.env.NODE_PUBLIC_PATH);
console.log(path.join(__dirname, "dist"));
console.log(path.join(__dirname, process.env.NODE_PUBLIC_PATH));

module.exports = merge(common, {
  /*==============================================================================*/
  mode: "development",
  /*==============================================================================*/
  devtool: "source-map",
  /*==============================================================================*/
  devServer: {
    contentBase: "src",
    watchContentBase: true,
    overlay: true,
    index: 'index.html',
    historyApiFallback: true,
    hot: true,
    inline: true,
  },
  /*==============================================================================*/
});