import { useToast } from "@chakra-ui/toast";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../config/axios";
import { ArticlesResponseData, SavedData } from "./useArticles";

const useCreateArticle = (page: number, queryTag: string) => {
  const queryClient = useQueryClient();

  const toast = useToast();

  return useMutation(
    (values: { url: string; tag: string }) =>
      axiosClient.post<SavedData>("/saved", {
        url: values.url,
        tag: values.tag,
      }),
    {
      onMutate: async (values: { url: string; tag: string }) => {
        await queryClient.cancelQueries("articles");

        const previousArticles = queryClient.getQueryData<any>([
          "articles",
          { page, queryTag },
        ]);

        if (previousArticles.results.length < 20) {
          queryClient.setQueryData<ArticlesResponseData>(
            ["articles", { queryTag, page }],
            {
              ...previousArticles,
              results: [
                ...previousArticles.results,
                {
                  _id: Math.random().toString(),
                  url: values.url,
                  archived: false,
                  tag: values.tag,
                },
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
          title: "New article added sucessfuly!",
          status: "success",
          isClosable: true,
          duration: 2000,
          position: "bottom-right",
        });
        queryClient.refetchQueries("articles");
      },
    }
  );
};

export default useCreateArticle;
