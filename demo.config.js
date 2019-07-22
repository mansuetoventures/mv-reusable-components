var path = require('path');

module.exports = {
    mode: 'production',

    entry:{
      'something':'./src/index.js',
      'AsyncActionOnInterval':'./src/AsyncActionOnInterval/demo.js',
      'SkinnyPano':'./src/BootstrapFrames/SkinnyPano/demo.js',
      'InfiniteScroll':'./src/InfiniteScroll/demo.js',
      'Article':'./src/Article/demo.js',
      'DialogBasedOnDialogMessage':'./src/DialogBasedOnDialogMessage/demo.js',
      'MultipleArticleHeaderFrames':'./src/BootstrapFrames/MultipleArticleHeaderFrames/demo.js',
      'FeatureImage':'./src/BootstrapFrames/FeatureImage/demo.js'
    },
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: 'demo/[name].js'
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
