import { useDisclosure } from "@chakra-ui/hooks";
import {
  AddIcon,
  ChevronRightIcon,
  HamburgerIcon,
  Icon,
  SmallAddIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
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
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { FC, useContext, useState, MouseEventHandler } from "react";
import { useQueryClient } from "react-query";
import { AuthContext } from "../../context/auth";
import { DrawerContainer } from "../ui/DrawerContainer";
import { StyleModeButton } from "../ui/StyleModeButton";
import { AddForm } from "./AddForm";

interface SideBarProps {
  drawerState: boolean;
  onClose: () => void;
  onSubmit: (url: string, tag: string) => void;
  tags: string[];
  activeTag: string;
  onTagFormSubmit: (tagName: string) => void;
  onTagDelete: (tagName: string) => void;
  isLoading: boolean;
  onQueryTagChange: (tagName: string) => void;
}

const tagColors = [
  "blue",
  "green",
  "purple",
  "teal",
  "pink",
  "cyan",
  "yellow",
  "red",
  "gray",
  "orange",
];

export const SideBar: FC<SideBarProps> = ({
  drawerState,
  onClose,
  onSubmit,
  tags,
  activeTag,
  onTagFormSubmit,
  onTagDelete,
  isLoading,
  onQueryTagChange,
}) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [user, loading] = useContext(AuthContext);
  const colorMode = useColorModeValue("white", "gray.800");
  const colorModeAccent = useColorModeValue("gray.50", "gray.900");
  const [tagForm, setTagform] = useState("");

  console.log("Rendering sidebar");

  return (
    <DrawerContainer
      isOpen={drawerState}
      isMobile={isLargerThan768}
      colorMode={colorMode}
      onClose={onClose}
    >
      <Box>
        <Heading size="lg" marginBottom={4}>
          User
        </Heading>

        <Stack
          marginBottom={4}
          p={2}
          backgroundColor={colorModeAccent}
          borderRadius={12}
          shadow="inner"
        >
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

        <AddForm tags={tags} onSubmit={onSubmit} />

        <Divider my={8} />

        <Heading size="lg" my={4}>
          Tags
        </Heading>
        <List
          spacing={3}
          px={2}
          py={4}
          backgroundColor={colorModeAccent}
          borderRadius={12}
          shadow="inner"
        >
          {isLoading ? (
            <Center w="100%" h="100%">
              <Spinner />
            </Center>
          ) : tags.length > 0 ? (
            tags.map((tag, i) => (
              <Stack key={tag} direction="row">
                <ListItem>
                  <ListIcon
                    as={ChevronRightIcon}
                    boxSize={activeTag === tag ? 8 : 4}
                    lineHeight={8}
                    verticalAlign="middle"
                  />
                  <Tag
                    verticalAlign="middle"
                    size={activeTag === tag ? "lg" : "md"}
                    lineHeight={8}
                    _hover={{ cursor: "pointer" }}
                    colorScheme={tagColors[i]}
                    onClick={() => onQueryTagChange(tag)}
                  >
                    {tag}
                  </Tag>
                </ListItem>
                <IconButton
                  as={SmallCloseIcon}
                  aria-label="Delete tag"
                  backgroundColor="transparent"
                  opacity="0.1"
                  _hover={{ cursor: "pointer", opacity: "0.6" }}
                  p={2}
                  size="sm"
                  ms={0}
                  onClick={() => onTagDelete(tag)}
                />
              </Stack>
            ))
          ) : (
            <p>No tags</p>
          )}
        </List>

        {tags.length < 10 && (
          <InputGroup
            mt={2}
            ps={2}
            width="70%"
            margin="auto"
            pb={isLargerThan768 ? 16 : 0}
          >
            <InputRightElement
              py={2}
              pointerEvents="auto"
              children={
                <IconButton
                  as={AddIcon}
                  aria-label="Add new tag"
                  backgroundColor="transparent"
                  color="gray.300"
                  size="sm"
                  padding="2"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    onTagFormSubmit(tagForm);
                    setTagform("");
                  }}
                />
              }
            />
            <Input
              value={tagForm}
              onChange={(event) => setTagform(event.target.value)}
              type="text"
              placeholder="Add new tag"
              variant="flushed"
            />
          </InputGroup>
        )}
      </Box>
    </DrawerContainer>
  );
};
