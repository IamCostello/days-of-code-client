import axios, { AxiosResponse } from "axios";
import axiosClient from "../config/axios";

type ResponseData = {
  tags: string[];
};

const handleTagsResponse = async (call: Promise<AxiosResponse<string[]>>) => {
  const { data } = await call;
  return data;
};

export const fetchUserTags = () =>
  handleTagsResponse(axiosClient.get<string[]>("/tags"));

export const createUserTag = (userTagName: string) =>
  axiosClient.post<string>("/tags", { tag: userTagName });

export const deleteUserTag = (userTagName: string) =>
  axiosClient.delete<string>("/tags", { data: { tag: userTagName } });
