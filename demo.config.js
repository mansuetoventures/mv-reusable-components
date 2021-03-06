var path = require('path');

module.exports = {
    //mode: 'production',
    mode: 'development',

    entry:{
      'something':'./src/index.js',
      'AsyncActionOnInterval':'./src/AsyncActionOnInterval/demo.js',
      'SkinnyPano':'./src/BootstrapFrames/SkinnyPano/demo.js',
      'Lead':'./src/BootstrapFrames/Lead/demo.js',
      'Full':'./src/BootstrapFrames/Full/demo.js',
      'InfiniteScroll':'./src/InfiniteScroll/demo.js',
      'Article':'./src/Article/demo.js',
      'DialogBasedOnDialogMessage':'./src/DialogBasedOnDialogMessage/demo.js',
      'MultipleArticleHeaderFrames':'./src/BootstrapFrames/MultipleArticleHeaderFrames/demo.js',
      'FeatureItemArea':'./src/BootstrapFrames/FeatureItemArea/demo.js',
      'HeaderInfoSection':'./src/BootstrapFrames/HeaderInfoSection/demo.js',
      'AsyncSwitch':'./src/AsyncSwitch/demo.js',
      'AutoCompletePicker':'./src/AutoCompletePicker/demo.js',
      'DraggableList':'./src/AutoCompletePicker/DraggableList/demo.js',
      'AutoComplete':'./src/AutoCompletePicker/AutoComplete/demo.js',
      'MainMenu':'./src/AutoCompletePicker/MainMenu/demo.js',
      'ShareButton':'./src/ShareButton/demo.js',
      'ShareButtons':'./src/ShareButton/ShareButtons/demo.js',

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
