import { useMutation } from "react-query";
import axiosClient from "../config/axios";

const useEditArticle = () => {
  return useMutation((values: { articleId: string; newUrl: string }) =>
    axiosClient.patch("/saved", {
      id: values.articleId,
      url: values.newUrl,
    })
  );
};

export default useEditArticle;
