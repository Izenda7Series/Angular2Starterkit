const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AotPlugin } = require('@ngtools/webpack');

const rules = [
	{ test: /\.html$/, loader: 'html-loader' },
	{ test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: "style-loader",
			use: "css-loader"
		})
	},
	{ test: /\.(jpe?g|png|gif|ico)$/i, loader: 'file-loader' },
	{
		test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
		loader: 'file-loader?name=./src/izenda/assets/[name].[ext]'
	}
];

const plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: (module) => module.context && /node_modules/.test(module.context)
	}),
	new webpack.ProvidePlugin({
		jQuery: 'jquery',
		$: 'jquery',
		jquery: 'jquery'
	}),
	new ExtractTextPlugin('main.css'),
	new HtmlWebpackPlugin({
		template: 'index.html'
	}),
	new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)/, path.resolve(__dirname, './src'))
];

if (process.env.NODE_ENV === 'production') {
	rules.push({
		test: /\.ts$/, loaders: ['@ngtools/webpack']
	});
	plugins.push(
		new AotPlugin({
			tsConfigPath: './tsconfig.json',
			entryModule: 'src/app/app.module#AppModule'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			beautify: false,
			mangle: {
				screw_ie8: true
			},
			compress: {
				unused: true,
				dead_code: true,
				drop_debugger: true,
				conditionals: true,
				evaluate: true,
				drop_console: true,
				sequences: true,
				booleans: true,
				screw_ie8: true,
				warnings: false
			},
			comments: false
		})
	);
} else {
	rules.push({
		test: /\.ts$/,
		loaders: [
			'awesome-typescript-loader', 'angular-router-loader', 'angular2-template-loader'
		]
	});
	plugins.push(
		new webpack.NamedModulesPlugin(),
		new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.resolve(__dirname, './notfound'))
	);
}

module.exports = {
	cache: true,
	context: __dirname,
	devtool: 'sourcemap',
	devServer: {
		contentBase: __dirname,
		historyApiFallback: true,
		stats: {
			chunk: false,
			chunkModules: false,
			chunkOrigins: false,
			errors: true,
			errorDetails: false,
			hash: false,
			timings: false,
			modules: false,
			warnings: false
		},
		publicPath: '/build/',
		port: 3030
	},
	entry: {
		app: ['zone.js/dist/zone', './src/main.ts'],
		izenda: ['./src/izenda.ts']
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name]-chunk.js',
		publicPath: '/build/',
		path: path.resolve(__dirname, 'build')
	},
	node: {
		console: false,
		global: true,
		process: true,
		Buffer: false,
		setImmediate: false
	},
	module: {
		rules
	},
	resolve: {
		extensions: ['.ts', '.js'],
		modules: [
			'src',
			'node_modules'
		]
	},
	plugins
};
