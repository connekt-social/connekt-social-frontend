import apiClient from "../../utils/apiClient";
import { DynamicGridSizes } from "../../utils/gridPlacementFunction";

export type ContentItemUploadParams = {
  teamId?: number;
  contentFormatCode: string;
  data: Record<string, unknown>;
  size?: DynamicGridSizes;
};
export const uploadContentItem = async (data: ContentItemUploadParams) => {
  const response = await apiClient.post("/content/items", data);
  return response.data;
};
