import { useQuery } from "react-query";
import axiosClient from "../config/axios";

export interface SavedData {
  _id: string;
  url: string;
  archived: boolean;
  tag: string;
}

export interface ArticlesResponseData {
  results: SavedData[];
  next: number;
  previous: number;
  hasMore: boolean;
  tags: string[];
}

const useArticles = (page: number, queryTag: string) => {
  return useQuery(["articles", { page, queryTag }], () =>
    axiosClient
      .get<ArticlesResponseData>("/saved", {
        params: { page, limit: 20, tag: queryTag },
      })
      .then((res) => res.data)
  );
};

export default useArticles;
