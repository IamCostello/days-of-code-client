import { useToast } from "@chakra-ui/toast";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../config/axios";

const useDeleteTag = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    (userTagName: string) =>
      axiosClient.delete<string>("/tags", {
        data: { tag: userTagName },
      }),
    {
      onMutate: async (userTagName: string) => {
        await queryClient.cancelQueries("tags");

        const previousTags = queryClient.getQueryData<any>("tags");

        if (previousTags) {
          queryClient.setQueryData<string[]>("tags", [
            ...previousTags.filter((tag: string) => tag !== userTagName),
          ]);
        }

        return previousTags;
      },
      onError: (err, newTag, context) =>
        queryClient.setQueryData("tags", context),
      onSuccess: () => {
        toast({
          title: "Tag deleted!",
          status: "error",
          isClosable: true,
          duration: 2000,
          position: "bottom-right",
        });
        queryClient.refetchQueries("tags");
      },
    }
  );
};

export default useDeleteTag;
