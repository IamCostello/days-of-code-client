import {
  Box,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import React, { FC, useState } from "react";
import { ArticleList } from "../components/sections/ArticleList";
import { Header } from "../components/sections/Header";
import { SideBar } from "../components/sections/SideBar";
import { AddButton } from "../components/ui/AddButton";
import { Article } from "../components/ui/Article";
import axiosClient from "../config/axios";
import { AddForm } from "../components/sections/AddForm";
import { AxiosError } from "axios";
import { NotificationPopUp } from "../components/ui/NotificationPopUp";
import useArticles from "../api/useArticles";
import useTags from "../api/useTags";
import useCreateArticle from "../api/useCreateArticle";
import useDeleteArticle from "../api/useDeleteArticle";
import useCreateTag from "../api/useCreateTag";
import useDeleteTag from "../api/useDeleteTag";
import useEditArticle from "../api/useEditArticle";

export const Dashboard: FC = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const colorMode = useColorModeValue("gray.100", "gray.900");
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: isLargerThan768,
  });

  const [page, setPage] = useState(1);
  const [queryTag, setQueryTag] = useState<string>("");

  const { data: userArticles, isLoading, isPreviousData } = useArticles(
    page,
    queryTag
  );
  const { mutate: createArticle } = useCreateArticle(page, queryTag);
  const { mutate: deleteArticle } = useDeleteArticle(page, queryTag);
  const { mutate: editArticle } = useEditArticle();
  const { data: userTags, isLoading: isUserTagsLoading } = useTags();
  const { mutate: createTag } = useCreateTag();
  const { mutate: deleteTag } = useDeleteTag();

  const handleDrawerToggle = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  const handleSetNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleSetPreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const queryClient = useQueryClient();

  // const patchMutation = useMutation(
  //   "articles",
  //   (data: SavedData) => changeArticleUrl(data._id, data.url),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("articles");
  //     },
  //   }
  // );

  const handleOnCreateArticle = (url: string, tag: string) => {
    createArticle({ url, tag });

    // if (createMutation.isSuccess) {
    // toast({
    //   title: "asd",
    //   description: { url },
    //   isClosable: true,
    //   duration: 2000,
    // });
    // }
  };

  const handleOnDeleteArticle = (articleId: string) => {
    deleteArticle(articleId);
  };

  const handleOnEditArticle = (articleId: string, newUrl: string) => {
    editArticle({ articleId, newUrl });
  };

  const handleOnCreateTag = (tagName: string) => {
    createTag(tagName);
  };

  const handleOnDeleteTag = (tagName: string) => {
    deleteTag(tagName);
  };

  const handleSetQueryTag = (tagName: string) => {
    setPage(1);
    setQueryTag((prev) => {
      if (prev === tagName) {
        return "";
      } else {
        return tagName;
      }
    });
    queryClient.invalidateQueries("articles");
  };

  return (
    <Flex direction="column">
      <Header
        dashboard
        drawerState={isOpen}
        onDrawerToggle={handleDrawerToggle}
      />
      <Stack
        direction="row"
        w="100%"
        height="100vh"
        justifyContent="center"
        backgroundColor={colorMode}
        pt="100px"
        pl={isOpen && isLargerThan768 ? "320px" : "0"}
      >
        <SideBar
          drawerState={isOpen}
          onClose={onClose}
          onSubmit={handleOnCreateArticle}
          tags={userTags || []}
          activeTag={queryTag}
          onTagFormSubmit={handleOnCreateTag}
          onTagDelete={handleOnDeleteTag}
          isLoading={isUserTagsLoading}
          onQueryTagChange={handleSetQueryTag}
        />
        <ArticleList
          articles={userArticles?.results || []}
          page={page}
          onSetNextPage={handleSetNextPage}
          onSetPreviousPage={handleSetPreviousPage}
          isPreviousData={isPreviousData}
          hasMore={userArticles?.hasMore || false}
          isLoading={isLoading}
          onArticleDelete={handleOnDeleteArticle}
          onArticleEdit={handleOnEditArticle}
        />
      </Stack>
    </Flex>
  );
};
