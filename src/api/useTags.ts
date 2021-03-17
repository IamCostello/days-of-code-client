import { useQuery } from "react-query";
import axiosClient from "../config/axios";

export type TagsResponseData = string[];

const useTags = () => {
  return useQuery("tags", () =>
    axiosClient.get<TagsResponseData>("/tags").then((res) => res.data)
  );
};

export default useTags;
