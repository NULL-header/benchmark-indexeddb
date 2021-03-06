import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HelloWorld } from "frontend/HelloWorld";
import { ChakraProvider } from "@chakra-ui/react";
import packageJson from "package.json";

const { name, version } = packageJson;

describe("normal system", () => {
  it("show infos from package.json", () => {
    render(
      <ChakraProvider>
        <HelloWorld />
      </ChakraProvider>,
    );
    const nameEl = screen.getByText(name);
    expect(nameEl).toBeInTheDocument();
    const verEl = screen.getByText(version);
    expect(verEl).toBeInTheDocument();
  });
});
