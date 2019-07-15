var path = require('path');

module.exports = {
    mode: 'production',

    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components|build)/,
            loader: 'babel-loader',
            options:{
                presets: ['env']
            }
          },
          {
            test: /\.scss$/,
            loader: 'inline-css-webpack-loader'
          }
        ]
    }
}
