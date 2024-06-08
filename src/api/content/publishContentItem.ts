import apiClient from "../../utils/apiClient";

export type PublishContentItemParams = {
  contentTypes: number[];
  itemId: number;
};

export const publishContentItem = async ({
  contentTypes,
  itemId,
}: PublishContentItemParams) => {
  const response = await apiClient.post(`/content/items/${itemId}/publish`, {
    contentTypes,
  });

  return response.data;
};
