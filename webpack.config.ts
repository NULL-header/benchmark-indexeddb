import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import DotEnvPlugin from "dotenv-webpack";

const webpackConfig: Configuration = {
  mode: "production",
  entry: "./src/index.tsx",
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
    libraryTarget: "umd",
  },
  target: "web",
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
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
    new DotEnvPlugin(),
    new HtmlWebpackPlugin({ template: "src/index.html" }),
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};

export default webpackConfig;
