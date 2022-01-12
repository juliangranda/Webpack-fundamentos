const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//añadir todas las configuraciones
module.exports = {
    //punto de entrada de la aplicacion, elemento inicial
    entry: './src/index.js',
    //hacia donde vamos a enviar lo que va a preparar webpack
    output: {
        //path es la carpeta donde se guardaran nuestros archivos
        path: path.resolve(__dirname, 'dist'), //dirname, es el archivo o carpeta del proyecto - dist: es un estandar para el nombre
        //filename: le pone el nombre a nuestro archivo final
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    //extensiones
    resolve: {
        extensions: ['.js'],
        alias: {
          '@utils': path.resolve(__dirname,'src/utils/'),
          '@templates': path.resolve(__dirname,'src/templates/'),
          '@styles': path.resolve(__dirname,'src/styles/'),
          '@images': path.resolve(__dirname,'src/assets/images/')
        }
    },
    module: {
        rules: [
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.m?js$/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
              loader: "babel-loader"
            },
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/
          },
          {
            test: /\.css|.styl$/i,
            use:[MiniCssExtractplugin.loader, 
            'css-loader',
            'stylus-loader'
            ],
          },
          {
            test: /\.png/,
            type: 'asset/resource'
          },
          {
            test: /\.(woff|woff2)$/,
            use:{
              loader:'url-loader',
              options:{
                limit:10000,
                mimetype:"application/font-woff",
                name:"[name].[contenthash].[ext]",
                outputPath: "./assets/fonts/",
                publicPath:"../assets/fonts/",
                esModule:false,
              }
            }
          }
        ]
      },
      plugins:[
          new HtmlWebpackPlugin({
              inject: true,
              template:'./public/index.html',
              filename: './index.html'
          }),
          new MiniCssExtractplugin({
            filename: 'assets/[name].[contenthash].css'
          }),
          new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
              }
            ]
          }),
      ],
      optimization:{
        minimize: true,
        minimizer:[
          new CssMinimizerPlugin(),
          new TerserPlugin(),
        ]
      }
}

//ejecucion de la configuracion de webpack
//npx webpack --mode production --config webpack.config.js

//npm run build (se encuentra en el package.json seccion de scripts)



