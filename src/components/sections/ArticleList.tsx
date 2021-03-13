import { Flex, useMediaQuery } from "@chakra-ui/react";
import React, { FC } from "react";
import { Article } from "../ui/Article";

interface ArticleListProps {}

const articles = [
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadfahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
];

export const ArticleList: FC<ArticleListProps> = ({}) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex
      direction="column"
      w={isLargerThan768 ? "80vw" : "100vw"}
      h="90vh"
      overflow="auto"
      p={8}
    >
      {articles.map((url) => (
        <Article articleUrl={url} onUpdate={() => null} onDelete={() => null} />
      ))}
    </Flex>
  );
};
