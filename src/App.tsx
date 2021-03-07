import React from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { measure } from "!comlink-loader?singleton=true!./worker";

export const App = () => (
  <div>
    <h4>start</h4>
    <button onClick={() => measure()} type="button">
      here
    </button>
  </div>
);
