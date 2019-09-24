var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = false;

module.exports = {
  //mode: 'production',
  mode: 'development',

  entry: {
    'BootstrapFrames/Full/Full':'./src/BootstrapFrames/Full/Full.js',
    'BootstrapFrames/Lead/Lead':'./src/BootstrapFrames/Lead/Lead.js',
    'BootstrapFrames/Portrait/Portrait':'./src/BootstrapFrames/Portrait/Portrait.js',
    'BootstrapFrames/SkinnyPano/SkinnyPano':'./src/BootstrapFrames/SkinnyPano/SkinnyPano.js',
    'Frames/Frames':'./src/Frames/Frames.js',
    'InfiniteScroll/InfiniteScroll':'./src/InfiniteScroll/InfiniteScroll.js',
    'Article/Article':'./src/Article/Article.js',
    'BootstrapFrames/FeatureItemArea/FeatureItemArea':'./src/BootstrapFrames/FeatureItemArea/FeatureItemArea.js',
    'AsyncSwitch/AsyncSwitch':'./src/AsyncSwitch/AsyncSwitch.js',
    'EditableTitle/EditableTitle':'./src/EditableTitle/EditableTitle.js',
    'EditableDeck/EditableDeck':'./src/EditableDeck/EditableDeck.js',

  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
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
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  
  plugins: [
    /*
    new MiniCssExtractPlugin({
      //filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      //chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      filename:'[name].css',
      chunkFilename: '[id].css'
    })*/
  ],
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};
