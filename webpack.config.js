const path = require('path');

const babelOptions = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      debug: true,
      targets: {
        browsers: ['IE >= 10']
      }
    }]
  ]
};

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      }
    ]
  }
};
