import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import React, { FC } from "react";

interface AddButtonProps {}

export const AddButton: FC<AddButtonProps> = ({}) => {
  return (
    <Button
      position="fixed"
      colorScheme="green"
      color="white"
      bottom="0"
      right="0"
      margin={8}
      shadow="lg"
    >
      <AddIcon />
    </Button>
  );
};
