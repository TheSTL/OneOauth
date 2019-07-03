const path =require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack');



const client ={
    entry:'./src/client/index.js',
  output: {
    path: path.join(__dirname,'/dist/public'),
    filename: 'client.js',
    publicPath: '/'
  },
  devtool:'source-map',
  module: {
    rules: [
      { test: /\.js$/, 
        exclude:/node_modules/,
            use: 'babel-loader'
     },{
       test:/\.css$/,
       use:'style-loader'
     },
     {
      test:/\.css$/,
      use:'css-loader'
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
          'url-loader?limit=10000',
        ],
      
    }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
        template:'./src/client/index.html'
    })
  ]
}

const  server={
    entry:{
     "server":  './src/server/index.js'
    },
    target:'node',
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules: [       
            {            
                     test: /\.js$/,      
                      exclude: /node_modules/,        
                      use: ["babel-loader"],       
             } ,
          ]
    },
    externals:[nodeExternals() ],
    plugins:[
      new Dotenv(),

    ]
}

module.exports=[client,server]