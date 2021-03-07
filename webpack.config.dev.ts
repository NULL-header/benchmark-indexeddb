import path from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import DotEnvPlugin from "dotenv-webpack";

const webpackConfig: Configuration = {
  mode: "development",
  entry: ["./src/index.dev.tsx"],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({ configFile: "tsconfig.build.json" }) as any,
    ],
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "bundle.js",
    publicPath: "/",
    pathinfo: false,
  },
  devtool: "inline-source-map",
  target: "web",
  module: {
    rules: [
      // {
      //   test: /src\/worker\/index.ts$/,
      //   loader: "comlink-loader",
      //   options: {
      //     singleton: true,
      //   },
      // },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          configFile: "tsconfig.build.json",
        },
        exclude: /public/,
      },
      {
        test: /\.js/,
        enforce: "pre",
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.html" }),
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new DotEnvPlugin(),
  ],
  stats: "errors-warnings",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};

export default webpackConfig;
