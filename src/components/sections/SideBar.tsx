import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronRightIcon } from "@chakra-ui/icons";
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
import { AuthContext } from "../../context/auth";
import { StyleModeButton } from "../ui/StyleModeButton";

interface SideBarProps {
  drawerState: boolean;
  onClose: () => void;
}

export const SideBar: FC<SideBarProps> = ({ drawerState, onClose }) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [user, loading] = useContext(AuthContext);
  const colorMode = useColorModeValue("white", "gray.800");

  return isLargerThan768 ? (
    drawerState ? (
      <Flex
        as="nav"
        h="90vh"
        w="20vw"
        overflow="auto"
        direction="column"
        justifyContent="space-between"
        shadow="base"
        // justifyContent="flex-end"
        p={4}
        // paddingTop={28}
        backgroundColor={colorMode}
      >
        <Box>
          <Heading size="lg" marginBottom={4}>
            User
          </Heading>

          <Stack marginBottom={4} paddingStart={6}>
            <Text>{user?.displayName}</Text>
            <Text>{user?.email}</Text>
          </Stack>

          <Divider />

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

            <Stack marginBottom={4} paddingStart={6}>
              <Text>{user?.displayName}</Text>
              <Text>{user?.email}</Text>
            </Stack>

            <Divider />

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
