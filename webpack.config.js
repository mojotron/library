module.exports = {
  entry: {
    main: "./src/scripts/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devtool: "eval-cheap-source-map",
};
