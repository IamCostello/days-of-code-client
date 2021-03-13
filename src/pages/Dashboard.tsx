import { Box, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";
import { ArticleList } from "../components/sections/ArticleList";
import { Header } from "../components/sections/Header";
import { SideBar } from "../components/sections/SideBar";
import { Article } from "../components/ui/Article";

export const Dashboard: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDrawerToggle = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <Flex direction="column">
      <Header dashboard onDrawerToggle={handleDrawerToggle} />
      <Stack direction="row" w="100%" justifyContent="center">
        <SideBar drawerState={isOpen} onClose={onClose} />
        <ArticleList />
      </Stack>
    </Flex>
  );
};
