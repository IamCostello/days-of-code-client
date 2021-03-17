import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Stack,
  useColorModeValue,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { Article } from "../ui/Article";

type UserArticle = {
  _id: string;
  url: string;
  archived: boolean;
};

interface ArticleListProps {
  articles: UserArticle[];
  page: number;
  onSetNextPage: () => void;
  onSetPreviousPage: () => void;
  isPreviousData: boolean;
  hasMore: boolean;
  isLoading: boolean;
  onArticleDelete: (articleId: string) => void;
  onArticleEdit: (articleId: string, newUrl: string) => void;
  activeTag: string;
}

export const ArticleList: FC<ArticleListProps> = ({
  articles,
  page,
  onSetNextPage,
  onSetPreviousPage,
  isPreviousData,
  hasMore,
  isLoading,
  onArticleDelete,
  onArticleEdit,
  activeTag,
}) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const buttonBackgroundColor = useColorModeValue("gray.100", "gray.900");
  const buttonColor = useColorModeValue("black", "white");

  return (
    <Flex
      direction="column"
      w={isLargerThan768 ? "80vw" : "100vw"}
      overflow="auto"
      p={isLargerThan768 ? 8 : 4}
    >
      {isLoading ? (
        <Center w="100%" h="100%">
          <Spinner />
        </Center>
      ) : articles.length > 0 ? (
        <>
          <Heading m={2}>
            {activeTag === ""
              ? "Showing all of the saved articles"
              : `Showing articles filtered by the "${activeTag}" tag`}
          </Heading>
          <Divider />
          <Text m={2} opacity={0.8} mb={4}>
            {activeTag === ""
              ? "Try filtering articles with one of the tags"
              : `Press the "${activeTag}" tag again to disable filtering`}
          </Text>
          {articles.map((article) => (
            <Article
              key={article._id}
              id={article._id}
              articleUrl={article.url}
              archived={article.archived}
              onDelete={onArticleDelete}
              onUpdate={onArticleEdit}
            />
          ))}
          <Stack direction="row" justify="center" my={4}>
            <IconButton
              aria-label="Previous page"
              as={ChevronLeftIcon}
              onClick={onSetPreviousPage}
              opacity={page === 1 ? 0.2 : 1}
              disabled={page === 1}
              size="lg"
              p={2}
              backgroundColor={buttonBackgroundColor}
              color={buttonColor}
            />
            <IconButton
              aria-label="Next page"
              as={ChevronRightIcon}
              onClick={() => {
                if (!isPreviousData && hasMore) {
                  onSetNextPage();
                }
              }}
              opacity={isPreviousData || !hasMore ? 0.2 : 1}
              disabled={isPreviousData || !hasMore}
              size="lg"
              p={2}
              backgroundColor={buttonBackgroundColor}
              color={buttonColor}
            />
          </Stack>
        </>
      ) : (
        <>
          <Heading m={2}>
            There doesn't seem to be any articles
            {activeTag === "" ? "" : ` with the "${activeTag}" tag`}
          </Heading>
          <Divider m={1} />
          <Text m={2} opacity={0.8}>
            Try creating a new one by opening the side drawer
          </Text>
        </>
      )}
    </Flex>
  );
};
