const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPugin = require('mini-css-extract-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: 'development',
	entry: {
		'NoligoUI_JSLib': ['@babel/polyfill', './src/index.ts'],
	},
	output: {
		filename: 'noligoui_jslib.js',
		//path: path.resolve('./dist'),
		path: path.resolve('../noligoui_server_node_mssql/www/common/nijs'),
		libraryTarget: "umd",
	},
	target: ['web', 'es5'],
	//devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			TWO: "1+1",
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			templateParameters: {
				env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
			},
			minify: process.env.NODE_ENV !== 'development' ? {
				collapseWhitespace: true, // 빈칸제거
				removeComments: true, // 주석 제거
			} : false,
			hash: true,
		}),
		new CleanWebpackPlugin(),
		...(process.env.NODE_ENV !== "development" ? [new MiniCssExtractPugin({ filename: '[name].css' })] : []),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					process.env.NODE_ENV !== 'development' ? MiniCssExtractPlugin.loader : "style-loader", 
					"css-loader",
				]
			},{
				test: /\.png$/,
				loader: 'url-loader',
				options: {
					publicPath: "./dist/images/",
					name: "[name].[ext]?[hash]",
					limit: 5000
				}
				// loader: 'file-loader',
				// options: {
				// 	publicPath: "./dist/images/",
				// 	name: "[name].[ext]?[hash]"
				// }

			},
			// {
			// 	test: /\.js$/,
			// 	include: [
			// 		path.resolve(__dirname, 'src/js')
			// 	],
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: 'babel-loader',
			// 		options: {
			// 		presets: ['@babel/preset-env'],
			// 		plugins: ['@babel/plugin-proposal-class-properties']
			// 		}
			// 	}
			// },
			{ // 여러개의 규칙들 (배열)
				test: /\.js?/, // 규칙 적용할 대상 확장자 (정규 표현식)
								// jsx? => js, jsx
				exclude: /node_modules/, // 제외
				loader: 'babel-loader',
				options: {
					presets: [ // plugin 설정들의 모음
						['@babel/preset-env', {
							targets: {
								"ie": "11"
							},
							debug: true, // 개발용
						}], 
						'@babel/preset-react'],
					plugins: [],
				},			
			},
			{
				test: /\.ts$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
				exclude: /node_module/,
				use: {
					loader: "ts-loader",
				},
			},
			{
				test: /\.tsx$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
				exclude: /node_module/,
				use: {
					loader: "ts-loader",
				},
			},		
			// {
			// 	test: /\.js$/,
			// 	include: path.join(__dirname),
			// 	exclude: /(node_modules)|(dist)/,
			// 	use: {
			// 		loader: 'babel-loader',
			// 		options: {
			// 		presets: ['@babel/preset-env']
			// 		}
			// 	}
			// }			
			// {
			// 	test: /\.js$/,
			// 	include: page.join(__dirname),
			// 	exclude: /(node_modules|dist)/,
			// 	// loader: "babel-loader",
			// 	use: {
			// 		loader: 'babel-loader',
			// 		options: {
			// 			presets: [[
			// 				"@babel/preset-env", {
			// 					"useBuiltIns": "entry",
			// 					"corejs": 3,
			// 					"targets": {
			// 						"browsers": ["last 3 versions", "ie >= 11"],
			// 						"node": "current"
			// 					}
			// 				}
			// 			]],
			// 			plugins: [] 
			// 		}
			// 	}
			// }
		],
	},
	resolve: {
		modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
		extensions: [".ts", ".js"/*, ".tsx", ".jsx"*/],
	},	
	devtool: 'eval', //devtool: 'source-map',
	mode: 'development',
	devServer: {
	 	//contentBase: path.join(__dirname, "dist"),
	// 	publicPath: "/",
	// 	//host: "dev.domain.com",
	// 	overlay: true,
	 	port: 8188,
	// 	stats: "errors-only",
	// 	historyApiFallback: true,
		hot: true
	}
}