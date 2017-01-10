var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
	//devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项，在开发阶段是一个非常好的选项，
								//但是在生产阶段一定不要用这个选项
    //运行webpack既可以打包出来
  	entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  	output: {
    	path: __dirname + "/dist",//打包后的文件存放的地方
    	filename: "js/index.js"//打包后输出文件的文件名
  	},
  	module: {
	    loaders: [
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        loader: 'babel'//在webpack的module部分的loaders里进行配置即可
	      },
        //单独将css打包出来
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style','css')
        },
        // {
        //   test: /\.css$/,
        //   loader: 'style-loader!css-loader'
        // },
        {
          test: /\.(jpg|png)$/,
          loader: 'url-loader?limit=8192'
        },
        {
          test: /\.json$/,
          loader: "json"
        },
        {
          test: /\.scss$/,
          loader: "sass"
        }
	    ]
	  },
  	//然后运行webpack-dev-server命令，顺利启动服务器后，在浏览器中输入http://localhost:8080/index.html就可以看到页面了
  	devServer: {
    	//contentBase: "./dist",//本地服务器所加载的页面所在的目录
    	colors: true,//终端中输出结果为彩色
    	historyApiFallback: true,//不跳转
    	inline: true//实时刷新
  	},
  	//该插件功能可以直接用webpack -p来代替
  	plugins: [
      //版权声明 打包在js中
      new webpack.BannerPlugin("Copyright Flying Unicorns inc."),
    	new webpack.optimize.UglifyJsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
      template: __dirname + "/app/index.html",//new 一个这个插件的实例，并传入相关的参数
    }),
      new OpenBrowserPlugin({
        url:'http://localhost:8080'
      }),
      new ExtractTextPlugin("css/main.css")
  	]
}