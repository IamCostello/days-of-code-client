import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, ListIcon, Stack } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import {
  Button,
  Divider,
  DrawerFooter,
  Input,
  List,
  ListItem,
  MenuItem,
  Tag,
  UnorderedList,
  useMediaQuery,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { FC, useContext } from "react";
import { useQueryClient } from "react-query";
import { AuthContext } from "../../context/auth";
import { StyleModeButton } from "../ui/StyleModeButton";
import { AddForm } from "./AddForm";

interface SideBarProps {
  drawerState: boolean;
  onClose: () => void;
  onSubmit: (url: string, tag: string) => void;
}

export const SideBar: FC<SideBarProps> = ({
  drawerState,
  onClose,
  onSubmit,
}) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [user, loading] = useContext(AuthContext);
  const colorMode = useColorModeValue("white", "gray.800");

  console.log("Rendering sidebar");

  return isLargerThan768 ? (
    drawerState ? (
      <Flex
        as="nav"
        // h="90vh"
        h="100%"
        // w="20vw"
        w="320px"
        overflow="auto"
        direction="column"
        justifyContent="space-between"
        shadow="base"
        // justifyContent="flex-end"
        p={4}
        // paddingTop={28}
        backgroundColor={colorMode}
        position="fixed"
        left="0"
        top="0"
      >
        <Box>
          <Stack direction="row" height="100px" py="16px">
            <Button onClick={onClose} variant="ghost">
              <HamburgerIcon />
            </Button>
          </Stack>

          <Heading size="lg" marginBottom={4}>
            User
          </Heading>

          <Stack marginBottom={4} ps={2}>
            <Text opacity="0.5" paddingStart={0}>
              username
            </Text>
            <Text fontSize="lg" paddingStart={2}>
              {user?.displayName}
            </Text>
            <Text opacity="0.5" paddingStart={0}>
              email
            </Text>
            <Text fontSize="lg" paddingStart={2}>
              {user?.email}
            </Text>
          </Stack>

          <Divider my={8} />

          <Heading size="lg" marginBottom={4}>
            Add new article
          </Heading>

          <AddForm onSubmit={onSubmit} />

          <Divider my={8} />

          <Heading size="lg" my={4}>
            Tags
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={ChevronRightIcon} />
              <Tag size="md">React</Tag>
            </ListItem>
            <ListItem>
              <ListIcon as={ChevronRightIcon} />
              <Tag size="md">Angular</Tag>
            </ListItem>
            <ListItem>
              <ListIcon as={ChevronRightIcon} />
              <Tag size="md">Python</Tag>
            </ListItem>
            <ListItem>
              <ListIcon as={ChevronRightIcon} />
              <Tag size="md">Machine learning</Tag>
            </ListItem>
          </List>
        </Box>
        <Flex>
          <StyleModeButton />
        </Flex>
      </Flex>
    ) : null
  ) : (
    <Drawer isOpen={drawerState} onClose={onClose} placement="left">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Account</DrawerHeader>
          <DrawerBody>
            <Heading size="lg" marginBottom={4}>
              User
            </Heading>

            <Stack marginBottom={4}>
              <Text opacity="0.5" paddingStart={0}>
                username
              </Text>
              <Text fontSize="lg" paddingStart={2}>
                {user?.displayName}
              </Text>
              <Text opacity="0.5" paddingStart={0}>
                email
              </Text>
              <Text fontSize="lg" paddingStart={2}>
                {user?.email}
              </Text>
            </Stack>

            <Divider my={4} />

            <Heading size="lg" marginBottom={4}>
              Add new article
            </Heading>

            <AddForm onSubmit={onSubmit} />

            <Divider my={4} />

            <Heading size="lg" my={4}>
              Tags
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={ChevronRightIcon} />
                <Tag size="md">React</Tag>
              </ListItem>
              <ListItem>
                <ListIcon as={ChevronRightIcon} />
                <Tag size="md">Angular</Tag>
              </ListItem>
              <ListItem>
                <ListIcon as={ChevronRightIcon} />
                <Tag size="md">Python</Tag>
              </ListItem>
              <ListItem>
                <ListIcon as={ChevronRightIcon} />
                <Tag size="md">Machine learning</Tag>
              </ListItem>
            </List>
          </DrawerBody>

          <DrawerFooter>
            <StyleModeButton />
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
