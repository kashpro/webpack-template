const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');


findHtmlTemplates = () => {
  return glob.sync(__dirname + "/src/*.html").
         map( (htmlFile) => {return path.parse(htmlFile).base;} ).
         map( (htmlFilesName) => {return new HtmlWebpackPlugin( {template: htmlFilesName, filename: htmlFilesName} ); } ); // Имена файлов html должны совпадать в папках src и dist
}

module.exports = {
  /*==============================================================================*/
	context: path.resolve(__dirname, 'src/'), // Для [path] у file-loader
  /*==============================================================================*/
  entry: {
    app: './js/main.js',
  },
  /*==============================================================================*/
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: "./", // при офлайне "./", для дев-сервера (для несуществующих маршрутов) "/"
    filename: 'js/[name].js',
  },
  /*==============================================================================*/
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }, 
	/*==============================================================================*/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-class-properties"], // Для статических полей класса, стрелочных методов класса
            }, 
          },
        ],
      },
    	/*---------------------------------------*/
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // Extract css into files (2)
            options: {
              publicPath: "../", // Добавляет ко всем url() в стилях путь "../". см. https://stackoverflow.com/questions/53787506/url-loader-file-loader-breaking-relative-paths-in-css-output-using-webpack
            },
          },
          {
          	loader: 'css-loader', // Translates CSS into CommonJS (1)
          	options: {},
          },
          {
            loader: 'postcss-loader', // Autoprefixer (0)
            options: {},
          },
        ],
      },
      /*---------------------------------------*/
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // Extract css into files (3)
            options: {
              publicPath: "../", // Добавляет ко всем url() в стилях путь "../". см. https://stackoverflow.com/questions/53787506/url-loader-file-loader-breaking-relative-paths-in-css-output-using-webpack
            },
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS (2)
            options: {},
          },
          {
            loader: 'postcss-loader', // Autoprefixer (1)
            options: {},
          },
          {
            loader: 'sass-loader', // Compiles Sass to CSS (0)
            options: {},
          },
        ],
      },
      /*---------------------------------------*/
      {
        test: /\.(png|svg|jpg|gif|webp)$/i,
        use: [
          {
          	loader: 'file-loader',
          	options: {
          		name: '[path][name].[ext]',
              esModule: false,
          	},
          },
          {
            loader: 'image-webpack-loader', // jpg и png будут завернуты в RIFF-контейнер
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 90,
              },
            },
          },
        ],
      },
      /*---------------------------------------*/
      {
        test: /\.(mp4|mpg|mov)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            esModule: false, // Для урлов ассетов в блоках template vue-файлов. Иначе будет [object Module]
            },
          },
        ],
      },
      /*---------------------------------------*/
      {
        test: /\.(mp3|wav|ogg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              esModule: false, // Для урлов ассетов в блоках template vue-файлов. Иначе будет [object Module]
            },
          },
        ],
      },
      /*---------------------------------------*/
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
          	loader: 'file-loader',
          	options: {
          		name: '[path][name].[ext]',
              esModule: false, // Для урлов ассетов в блоках template vue-файлов. Иначе будет [object Module]
          	},
          },
        ],
      },
      /*---------------------------------------*/
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {},
          }
        ],
      },
      /*---------------------------------------*/
      { 
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {},
          },
        ],
      },
      /*---------------------------------------*/
    ],
  },
  /*==============================================================================*/
  plugins: [
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin( {filename: 'css/app.css',} ),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./assets/favicons", to: "", },
      ],
    }),
    ...findHtmlTemplates(),
  ],
};
