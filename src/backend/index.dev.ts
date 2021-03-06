import webpack from "webpack";
import WebpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import webpackConfigDev from "webpack.config.dev";
import { app } from "./app";
import { constValue } from "./constValue";

const compiler = webpack(webpackConfigDev);
app
  .use(
    WebpackDevMiddleware(compiler, {
      stats: webpackConfigDev.stats,
      publicPath: webpackConfigDev.output?.publicPath as string,
    }),
  )
  .use(WebpackHotMiddleware(compiler))
  .listen(constValue.PORT, () => {
    console.log("development mode");
    console.log(`start listening at ${constValue.PORT}`);
  });
