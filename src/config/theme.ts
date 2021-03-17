import { extendTheme } from "@chakra-ui/react";

const nightMode = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
});

export default nightMode;
