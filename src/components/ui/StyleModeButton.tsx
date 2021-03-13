import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { FC } from "react";

export const StyleModeButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
