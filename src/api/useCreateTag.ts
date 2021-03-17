import { useToast } from "@chakra-ui/toast";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../config/axios";

const useCreateTag = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    (userTagName: string) =>
      axiosClient.post<string>("/tags", {
        tag: userTagName,
      }),
    {
      onMutate: async (userTagName: string) => {
        await queryClient.cancelQueries("tags");

        const previousTags = queryClient.getQueryData<any>("tags");

        if (previousTags && previousTags.length < 10) {
          queryClient.setQueryData<string[]>("tags", [
            ...previousTags,
            userTagName,
          ]);
        }

        return previousTags;
      },
      onError: (err, newTag, context) =>
        queryClient.setQueryData("tags", context),
      onSuccess: () => {
        toast({
          title: "New tag created!",
          status: "success",
          isClosable: true,
          duration: 2000,
          position: "bottom-right",
        });
        queryClient.refetchQueries("tags");
      },
    }
  );
};

export default useCreateTag;
