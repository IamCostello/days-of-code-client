import { extendTheme } from "@chakra-ui/react";

const nightMode = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default nightMode;
