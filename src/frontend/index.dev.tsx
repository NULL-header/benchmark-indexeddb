import React from "react";
import ReactDom from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { constValue } from "./constValue";
import { HelloWorld } from "./HelloWorld";

ReactDom.render(
  <ChakraProvider>
    <h3>This is development mode</h3>
    <div>PORT: {constValue.PORT}</div>
    <hr />
    <HelloWorld />
  </ChakraProvider>,
  document.getElementById("root"),
);
