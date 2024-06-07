import apiClient from "../../utils/apiClient";

export type ContentItem = {
  id: number;
  userId: number;
  contentFormatCode: string;
  data: object;
  title: string;
  caption?: string;
  thumbnail?: string;
  size: string;
  createdAt: string;
  updatedAt: string;
};
export const getContentItems = async () => {
  const response = await apiClient.get<ContentItem[]>("/content/items");

  return response.data;
};
