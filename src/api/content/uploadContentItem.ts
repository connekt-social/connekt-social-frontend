import apiClient from "../../utils/apiClient";
import { DynamicGridSizes } from "../../utils/gridPlacementFunction";

export type ContentItemUploadParams = {
  teamId?: number;
  contentTypeId: number;
  data: Record<string, unknown>;
  title: string;
  size?: DynamicGridSizes;
};
export const uploadContentItem = async (data: ContentItemUploadParams) => {
  const response = await apiClient.post("/content/item", data);
  return response.data;
};
