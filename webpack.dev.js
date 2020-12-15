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
  // output: {
    // publicPath: "/", // при офлайне "./", для дев-сервера (для несуществующих маршрутов) "/"
    // publicPath: process.env.NODE_PUBLIC_PATH,
    // path: path.resolve(__dirname, process.env.NODE_PUBLIC_PATH),
  // },
  /*==============================================================================*/
  devtool: "source-map",
  /*==============================================================================*/
  devServer: {
    // publicPath: '/',
    // contentBase: path.join(__dirname, "dist"),
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