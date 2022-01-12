const path = require('path');

//añadir todas las configuraciones
module.exports = {
    //punto de entrada de la aplicacion, elemento inicial
    entry: './src/index.js',
    //hacia donde vamos a enviar lo que va a preparar webpack
    output: {
        //path es la carpeta donde se guardaran nuestros archivos
        path: path.resolve(__dirname, 'dist'), //dirname, es el archivo o carpeta del proyecto - dist: es un estandar para el nombre
        //filename: le pone el nombre a nuestro archivo final
        filename: 'main.js',
    },
    //extensiones
    resolve: {
        extensions: ['.js']
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
          }
        ]
      }
}

//ejecucion de la configuracion de webpack
//npx webpack --mode production --config webpack.config.js

//npm run build (se encuentra en el package.json seccion de scripts)



