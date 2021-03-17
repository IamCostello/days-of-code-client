import { AddIcon, ChevronRightIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Heading, ListIcon, Stack } from "@chakra-ui/layout";
import {
  Divider,
  Input,
  List,
  ListItem,
  Tag,
  useMediaQuery,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";

import { AuthContext } from "../../context/auth";
import { DrawerContainer } from "../ui/DrawerContainer";

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
  const [user] = useContext(AuthContext);
  const colorMode = useColorModeValue("white", "gray.800");
  const colorModeAccent = useColorModeValue("gray.50", "gray.900");
  const [tagForm, setTagform] = useState("");

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
          <Text opacity="0.5" paddingStart={0}>
            mailer service
          </Text>
          <Text fontSize="lg" paddingStart={2}>
            Mailing service is currently inactive
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
                    boxSize={activeTag === tag ? 6 : 4}
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
            <Center w="100%" h="100%">
              create a new tag below
            </Center>
          )}
        </List>

        {tags.length < 10 && (
          <InputGroup
            mt={2}
            ps={2}
            width="80%"
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
