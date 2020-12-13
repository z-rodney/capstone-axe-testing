const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = () => {
	const dotEnvConfig = dotenv.config().parsed
	const keys = {
		'process.env.MAPBOXPK': JSON.stringify(dotEnvConfig.MAPBOXPK)
	}
	return {
		entry: ["./client/index.js"],
		output: {
			path: __dirname,
			filename: "server/public/bundle.js",
		},
		resolve: {
			extensions: [".js", ".jsx"],
		},
		devtool: "source-map",
		watchOptions: {
			ignored: /node_modules/,
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react"],
					},
				},
				{
					test: /\.css$/,
					use: [
						"style-loader",
						"css-loader"
					]
				}
			],
		},
		plugins: [
			new webpack.DefinePlugin(keys),
		]
	}
}
