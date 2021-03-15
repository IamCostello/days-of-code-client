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
  onTagFormSubmit: (tagName: string) => void;
  onTagDelete: (tagName: string) => void;
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
  onTagFormSubmit,
  onTagDelete,
}) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [user, loading] = useContext(AuthContext);
  const colorMode = useColorModeValue("white", "gray.800");
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
          backgroundColor="gray.50"
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
          backgroundColor="gray.50"
          borderRadius={12}
          shadow="inner"
        >
          {tags.map((tag, i) => (
            <Stack key="tag" direction="row">
              <ListItem>
                <ListIcon as={ChevronRightIcon} />
                <Tag
                  verticalAlign="middle"
                  size="lg"
                  lineHeight={8}
                  _hover={{ cursor: "pointer" }}
                  colorScheme={tagColors[i]}
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
          ))}
        </List>

        {tags.length < 10 && (
          <InputGroup
            mt={2}
            pb={isLargerThan768 ? 16 : 0}
            ps={2}
            width="70%"
            margin="auto"
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

  // return isLargerThan768 ? (
  //   drawerState ? (
  //     <Flex
  //       as="nav"
  //       // h="90vh"
  //       h="100%"
  //       // w="20vw"
  //       w="320px"
  //       overflow="auto"
  //       direction="column"
  //       justifyContent="space-between"
  //       shadow="base"
  //       // justifyContent="flex-end"
  //       p={4}
  //       pe={8}
  //       // paddingTop={28}
  //       backgroundColor={colorMode}
  //       position="fixed"
  //       left="0"
  //       top="0"
  //     >
  //       <Box>
  //         <Stack direction="row" height="100px" py="16px">
  //           <Button onClick={onClose} variant="ghost">
  //             <HamburgerIcon />
  //           </Button>
  //         </Stack>

  //         <Heading size="lg" marginBottom={4}>
  //           User
  //         </Heading>

  //         <Stack
  //           marginBottom={4}
  //           p={2}
  //           backgroundColor="gray.50"
  //           borderRadius={12}
  //           shadow="inner"
  //         >
  //           <Text opacity="0.5" paddingStart={0}>
  //             username
  //           </Text>
  //           <Text fontSize="lg" paddingStart={2}>
  //             {user?.displayName}
  //           </Text>
  //           <Text opacity="0.5" paddingStart={0}>
  //             email
  //           </Text>
  //           <Text fontSize="lg" paddingStart={2}>
  //             {user?.email}
  //           </Text>
  //         </Stack>

  //         <Divider my={8} />

  //         <Heading size="lg" marginBottom={4}>
  //           Add new article
  //         </Heading>

  //         <AddForm tags={tags} onSubmit={onSubmit} />

  //         <Divider my={8} />

  //         <Heading size="lg" my={4}>
  //           Tags
  //         </Heading>
  //         <List
  //           spacing={3}
  //           px={2}
  //           py={4}
  //           backgroundColor="gray.50"
  //           borderRadius={12}
  //           shadow="inner"
  //         >
  //           {tags.map((tag, i) => (
  //             <Stack key="tag" direction="row">
  //               <ListItem>
  //                 <ListIcon as={ChevronRightIcon} />
  //                 <Tag
  //                   verticalAlign="middle"
  //                   size="lg"
  //                   lineHeight={8}
  //                   _hover={{ cursor: "pointer" }}
  //                   colorScheme={tagColors[i]}
  //                 >
  //                   {tag}
  //                 </Tag>
  //               </ListItem>
  //               <IconButton
  //                 as={SmallCloseIcon}
  //                 aria-label="Delete tag"
  //                 backgroundColor="transparent"
  //                 opacity="0.1"
  //                 _hover={{ cursor: "pointer", opacity: "0.6" }}
  //                 p={2}
  //                 size="sm"
  //                 ms={0}
  //                 onClick={() => onTagDelete(tag)}
  //               />
  //             </Stack>
  //           ))}
  //         </List>

  //         {tags.length < 10 && (
  //           <InputGroup mt={2} mb={4}>
  //             <InputRightElement
  //               py={2}
  //               pointerEvents="auto"
  //               children={
  //                 <IconButton
  //                   as={AddIcon}
  //                   aria-label="Add new tag"
  //                   backgroundColor="transparent"
  //                   color="gray.300"
  //                   size="sm"
  //                   padding="2"
  //                   type="submit"
  //                   onClick={(event) => {
  //                     event.preventDefault();
  //                     onTagFormSubmit(tagForm);
  //                     setTagform("");
  //                   }}
  //                 />
  //               }
  //             />
  //             <Input
  //               value={tagForm}
  //               onChange={(event) => setTagform(event.target.value)}
  //               type="text"
  //               placeholder="Add new tag"
  //               variant="flushed"
  //             />
  //           </InputGroup>
  //         )}
  //       </Box>
  //       <Flex>
  //         <StyleModeButton />
  //       </Flex>
  //     </Flex>
  //   ) : null
  // ) : (
  //   <Drawer isOpen={drawerState} onClose={onClose} placement="left">
  //     <DrawerOverlay>
  //       <DrawerContent>
  //         <DrawerCloseButton />
  //         <DrawerHeader>Account</DrawerHeader>
  //         <DrawerBody>
  //           <Box>
  //             <Heading size="lg" marginBottom={4}>
  //               User
  //             </Heading>

  //             <Stack
  //               marginBottom={4}
  //               p={2}
  //               backgroundColor="gray.50"
  //               borderRadius={12}
  //               shadow="inner"
  //             >
  //               <Text opacity="0.5" paddingStart={0}>
  //                 username
  //               </Text>
  //               <Text fontSize="lg" paddingStart={2}>
  //                 {user?.displayName}
  //               </Text>
  //               <Text opacity="0.5" paddingStart={0}>
  //                 email
  //               </Text>
  //               <Text fontSize="lg" paddingStart={2}>
  //                 {user?.email}
  //               </Text>
  //             </Stack>

  //             <Divider my={8} />

  //             <Heading size="lg" marginBottom={4}>
  //               Add new article
  //             </Heading>

  //             <AddForm tags={tags} onSubmit={onSubmit} />

  //             <Divider my={8} />

  //             <Heading size="lg" my={4}>
  //               Tags
  //             </Heading>
  //             <List
  //               spacing={3}
  //               px={2}
  //               py={4}
  //               backgroundColor="gray.50"
  //               borderRadius={12}
  //               shadow="inner"
  //             >
  //               {tags.map((tag, i) => (
  //                 <Stack key="tag" direction="row">
  //                   <ListItem>
  //                     <ListIcon as={ChevronRightIcon} />
  //                     <Tag
  //                       verticalAlign="middle"
  //                       size="lg"
  //                       lineHeight={8}
  //                       _hover={{ cursor: "pointer" }}
  //                       colorScheme={tagColors[i]}
  //                     >
  //                       {tag}
  //                     </Tag>
  //                   </ListItem>
  //                   <IconButton
  //                     as={SmallCloseIcon}
  //                     aria-label="Delete tag"
  //                     backgroundColor="transparent"
  //                     opacity="0.1"
  //                     _hover={{ cursor: "pointer", opacity: "0.6" }}
  //                     p={2}
  //                     size="sm"
  //                     ms={0}
  //                     onClick={() => onTagDelete(tag)}
  //                   />
  //                 </Stack>
  //               ))}
  //             </List>

  //             {tags.length < 10 && (
  //               <InputGroup mt={2} mb={4}>
  //                 <InputRightElement
  //                   py={2}
  //                   pointerEvents="auto"
  //                   children={
  //                     <IconButton
  //                       as={AddIcon}
  //                       aria-label="Add new tag"
  //                       backgroundColor="transparent"
  //                       color="gray.300"
  //                       size="sm"
  //                       padding="2"
  //                       type="submit"
  //                       onClick={(event) => {
  //                         event.preventDefault();
  //                         onTagFormSubmit(tagForm);
  //                         setTagform("");
  //                       }}
  //                     />
  //                   }
  //                 />
  //                 <Input
  //                   value={tagForm}
  //                   onChange={(event) => setTagform(event.target.value)}
  //                   type="text"
  //                   placeholder="Add new tag"
  //                   variant="flushed"
  //                 />
  //               </InputGroup>
  //             )}
  //           </Box>
  //         </DrawerBody>

  //         <DrawerFooter>
  //           <StyleModeButton />
  //         </DrawerFooter>
  //       </DrawerContent>
  //     </DrawerOverlay>
  //   </Drawer>
  // );
};
