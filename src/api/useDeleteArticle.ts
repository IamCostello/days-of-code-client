import { useToast } from "@chakra-ui/toast";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../config/axios";
import { ArticlesResponseData, SavedData } from "./useArticles";

const useDeleteArticle = (page: number, queryTag: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    (articleId: string) =>
      axiosClient.delete<SavedData>("/saved", {
        data: { id: articleId },
      }),
    {
      onMutate: async (articleId: string) => {
        await queryClient.cancelQueries("articles");

        const previousArticles = queryClient.getQueryData<any>([
          "articles",
          { page, queryTag },
        ]);

        if (previousArticles) {
          queryClient.setQueryData<ArticlesResponseData>(
            ["articles", { queryTag, page }],
            {
              ...previousArticles,
              results: [
                ...previousArticles.results.filter(
                  (article: SavedData) => article._id !== articleId
                ),
              ],
            }
          );
        }

        return previousArticles;
      },
      onError: (err, newArticle, context) =>
        queryClient.setQueryData("articles", context),
      onSuccess: () => {
        toast({
          title: "Article deleted sucessfuly!",
          status: "error",
          isClosable: true,
          duration: 2000,
          position: "bottom-right",
        });
        queryClient.refetchQueries("articles");
      },
    }
  );
};

export default useDeleteArticle;
