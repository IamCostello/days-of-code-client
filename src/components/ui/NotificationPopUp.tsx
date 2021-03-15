import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React, { FC } from "react";

interface NotificationPopUpProps {
  title: string;
  description: string;
}

export const NotificationPopUp: FC<NotificationPopUpProps> = ({
  title,
  description,
}) => {
  const toast = useToast();

  return (
    <Box position="fixed" bottom="0" right="0" p={4}>
      {toast({
        isClosable: true,
        title,
        description,
        duration: 2000,
      })}
    </Box>
  );
};
