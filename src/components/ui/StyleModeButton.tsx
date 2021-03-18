import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { FC } from "react";

export const StyleModeButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("white", "gray.800");

  return (
    <Button onClick={toggleColorMode} backgroundColor={backgroundColor} m={2}>
      {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
