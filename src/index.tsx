import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthStateProvider } from "./context/auth";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import nightMode from "./config/theme";

ReactDOM.render(
  <React.StrictMode>
    <AuthStateProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode={nightMode.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </AuthStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
