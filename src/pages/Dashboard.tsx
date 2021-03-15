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
import {
  changeArticleUrl,
  createArticle,
  deleteArticle,
  fetchArticles,
  SavedData,
  UserData,
} from "../api/articles";
import { AddForm } from "../components/sections/AddForm";
import { AxiosError } from "axios";
import { NotificationPopUp } from "../components/ui/NotificationPopUp";
import { createUserTag, fetchUserTags, deleteUserTag } from "../api/tags";

export const Dashboard: FC = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: isLargerThan768,
  });
  const colorMode = useColorModeValue("gray.100", "gray.900");

  const [page, setPage] = useState(1);
  const [queryTag, setQueryTag] = useState<string>("");

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["articles", page, queryTag],
    () => fetchArticles(page, queryTag),
    {
      keepPreviousData: true,
    }
  );

  const userTags = useQuery("tags", fetchUserTags);

  const userTagsCreateMutation = useMutation(
    "tags",
    (data: string) => createUserTag(data),
    {
      onSuccess: () => queryClient.invalidateQueries("tags"),
    }
  );

  const userTagsDeleteMutation = useMutation(
    "tags",
    (data: string) => deleteUserTag(data),
    {
      onSuccess: () => queryClient.invalidateQueries("tags"),
    }
  );

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

  const createMutation = useMutation(
    "articles",
    (data: SavedData) => createArticle(data.url, data.tag),
    {
      onSuccess: () => {
        if (data?.results.length! < 20) {
          queryClient.invalidateQueries("articles");
        }
      },
    }
  );

  const deleteMutation = useMutation(
    "articles",
    (data: SavedData) => deleteArticle(data._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("articles");
      },
    }
  );

  const patchMutation = useMutation(
    "articles",
    (data: SavedData) => changeArticleUrl(data._id, data.url),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("articles");
      },
    }
  );

  const handleOnCreateArticle = (url: string, tag: string) => {
    console.log(url, tag);
    // createArticle(url, tag);
    // mutation();
    createMutation.mutate({ url, tag } as SavedData);

    if (createMutation.isSuccess) {
      // toast({
      //   title: "asd",
      //   description: { url },
      //   isClosable: true,
      //   duration: 2000,
      // });
    }
  };

  const handleOnDeleteArticle = (articleId: string) => {
    // queryClient.invalidateQueries("articles");
    deleteMutation.mutate({ _id: articleId } as SavedData);
  };

  const handleOnEditArticle = (articleId: string, newUrl: string) => {
    patchMutation.mutate({ _id: articleId, url: newUrl } as SavedData);
  };

  const handleOnCreateTag = (tagName: string) => {
    userTagsCreateMutation.mutate(tagName);
  };

  const handleOnDeleteTag = (tagName: string) => {
    userTagsDeleteMutation.mutate(tagName);
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

  console.log("Rendering dashboard");

  return (
    <Flex direction="column">
      <Header dashboard onDrawerToggle={handleDrawerToggle} />
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
          tags={userTags.data || []}
          onTagFormSubmit={handleOnCreateTag}
          onTagDelete={handleOnDeleteTag}
          isLoading={userTags.isLoading}
          onQueryTagChange={handleSetQueryTag}
        />
        <ArticleList
          articles={data?.results || []}
          page={page}
          onSetNextPage={handleSetNextPage}
          onSetPreviousPage={handleSetPreviousPage}
          isPreviousData={isPreviousData}
          hasMore={data?.hasMore || false}
          isLoading={isLoading}
          onArticleDelete={handleOnDeleteArticle}
          onArticleEdit={handleOnEditArticle}
        />
      </Stack>
    </Flex>
  );
};
