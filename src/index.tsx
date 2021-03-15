import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthStateProvider } from "./context/auth";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import nightMode from "./config/theme";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./config/query";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthStateProvider>
        <ChakraProvider>
          <ColorModeScript
            initialColorMode={nightMode.config.initialColorMode}
          />
          <App />
        </ChakraProvider>
      </AuthStateProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
