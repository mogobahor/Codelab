const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { TsConfigPathsPlugin } = require("awesome-typescript-loader");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve("awesome-typescript-loader"),
            // https://stackoverflow.com/questions/38379965/specify-path-to-tsconfig-json
            query: {
              configFileName: path.resolve(
                __dirname,
                "../",
                "tsconfig.build.json",
              ),
            },
          },
          {
            loader: require.resolve("react-docgen-typescript-loader"),
          },
        ],
      },
      {
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../"),
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx"],
    modules: [
      /**
       * Absolute Import
       */
      path.resolve(__dirname, "../"),
      /**
       * Yarn workspace root
       */
      path.resolve(__dirname, "../../../", "node_modules"),
    ],
  },
};
