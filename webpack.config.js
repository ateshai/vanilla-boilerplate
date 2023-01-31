const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "assets/scripts/main.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
      },
      {
          test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
      }
    ],
  },
  resolve: {
		alias: {
			images: path.resolve(__dirname, 'assets/images/'),
      styles: path.resolve(__dirname, 'assets/styles/'),
      scripts: path.resolve(__dirname, 'assets/scripts/'),
    },
	},
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
				{ 
						from: "*.html",
						to: path.resolve(__dirname,"dist/")
				},
				{ 
						from: "assets/images/**/*",
						to: path.resolve(__dirname,"dist/")
				},
				// { 
				// 		from: "assets/fonts/**/*",
				// 		to: path.resolve(__dirname,"dist/")
				// },
      ],
    }),
	],
	
	devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  mode: "development",
}