import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { StyleModeButton } from "./StyleModeButton";

interface DrawerContainerProps {
  isOpen: boolean;
  isMobile: boolean;
  colorMode: string;
  onClose: () => void;
}

export const DrawerContainer: FC<DrawerContainerProps> = ({
  children,
  isOpen,
  isMobile,
  colorMode,
  onClose,
}) => {
  return isMobile ? (
    isOpen ? (
      <Flex
        as="nav"
        h="100%"
        w="320px"
        overflow="auto"
        direction="column"
        shadow="base"
        p={4}
        pe={8}
        paddingTop={28}
        backgroundColor={colorMode}
        position="fixed"
        left="0"
        top="0"
        pt={12}
      >
        <Stack direction="row" height="100px" py="16px">
          <Button onClick={onClose} variant="ghost">
            <HamburgerIcon />
          </Button>
        </Stack>
        {children}
        <Flex
          mt={4}
          position="fixed"
          left="0"
          bottom="0"
          justifyContent="flex-end"
          backgroundColor={colorMode}
          p={4}
          pe={8}
          width="inherit"
          zIndex="10"
        >
          <StyleModeButton />
        </Flex>
      </Flex>
    ) : null
  ) : (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay>
        <DrawerContent backgroundColor={colorMode}>
          <DrawerCloseButton />
          <DrawerHeader>Account</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            <StyleModeButton />
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
