import axios, { AxiosResponse } from "axios";
import axiosClient from "../config/axios";

export interface SavedData {
  _id: string;
  url: string;
  archived: boolean;
  tag: string;
}

export interface UserData {
  results: SavedData[];
  next: number;
  previous: number;
  hasMore: boolean;
  tags: string[];
}

const handleArticleResponse = async (
  call: Promise<AxiosResponse<UserData>>
) => {
  const { data } = await call;
  console.log(data);
  console.log(data.results);
  return data;

  // try {
  //   const { data } = await call;
  //   return data;
  // } catch (error) {
  //   const response: userData = {
  //     message: error.response.data.message,
  //     todoList: [],
  //   };
  //   return response;
  // }
};

// const fetchArticles = async () => {
//   const data = axiosClient.get("/saved", {
//     params: {
//       page: 1,
//       limit: 2,
//     },
//   });
//   return data;
// };

export const fetchArticles = (page: number, tag?: string, limit: number = 20) =>
  handleArticleResponse(
    axiosClient.get<UserData>("/saved", { params: { page, limit, tag } })
  );

export const createArticle = (url: string, tag: string) =>
  axiosClient.post<SavedData>("/saved", { url, tag });

export const deleteArticle = (articleId: string) =>
  axiosClient.delete<SavedData>("/saved", { data: { id: articleId } });

export const changeArticleUrl = (articleId: string, url: string) =>
  axiosClient.patch<SavedData>("/saved", { id: articleId, url });
