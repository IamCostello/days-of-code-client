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
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
  "ahsdfajkdfjsdfjwiefowhpeuifsadfsadf",
];

export const ArticleList: FC<ArticleListProps> = ({}) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  // <Center w="100%" h="100vh">
  //   <Spinner />
  // </Center>;

  return (
    <Flex
      direction="column"
      w={isLargerThan768 ? "80vw" : "100vw"}
      // h="90vh"
      h="100%"
      overflow="auto"
      p={8}
    >
      {articles.map((url) => (
        <Article articleUrl={url} onUpdate={() => null} onDelete={() => null} />
      ))}
    </Flex>
  );
};
