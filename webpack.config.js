const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
        clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
			{
				test: /\.s[ac]ss$/i,
				use: [
				  // Creates `style` nodes from JS strings
				  "style-loader",
				  // Translates CSS into CommonJS
				  "css-loader",
				  // Compiles Sass to CSS
				  "sass-loader",
				],
			  },
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			inject: "head",
			scriptLoading: "defer",

		}),
	],
};