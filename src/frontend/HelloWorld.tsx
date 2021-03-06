import React from "react";
import pkg from "package.json";
import { Box, Divider, Heading, Text, Circle, Stack } from "@chakra-ui/react";

const { name, version } = pkg;
const infos = { name, version };

const Info = ({ paramName, text }: { paramName: string; text: string }) => (
  <Box
    display="flex"
    justifyContent="flex-end"
    paddingRight="10"
    flexDirection="column"
  >
    <Box marginLeft="5">
      <Heading as="h4" size="md">
        {paramName}:
      </Heading>
    </Box>
    <Box display="flex" justifyContent="flex-end">
      <Text>{text}</Text>
    </Box>
  </Box>
);

export const HelloWorld = () => (
  <Box>
    <Circle
      bg="tomato"
      color="white"
      justifyContent="flex-start"
      marginLeft="5"
      marginRight="5"
      marginTop="10"
      maxHeight="20"
      minHeight="20"
    >
      <Heading height="100%" width="100%" padding="3" paddingLeft="10">
        Hello, World!
      </Heading>
    </Circle>
    <Box justifyContent="flex-end" display="flex" marginTop="10">
      <Box width="60%" padding="5">
        <Stack spacing="6">
          <Heading>Infos</Heading>
          <Divider />
          {Object.entries(infos).map(([paramName, text]) => (
            <Info key={paramName} {...{ paramName, text }} />
          ))}
        </Stack>
      </Box>
    </Box>
  </Box>
);
