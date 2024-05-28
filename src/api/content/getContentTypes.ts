import { RJSFSchema, UiSchema } from "@rjsf/utils";
import apiClient from "../../utils/apiClient";

export type ContentType = {
  id: number;
  name: string;
  description: string;
  schema?: RJSFSchema;
  uiSchema?: UiSchema;
};
export const getContentTypes = async () => {
  const response = await apiClient.get<ContentType[]>("/content/types");

  return response.data.map((contentType) => ({
    ...contentType,
    uiSchema: contentType.uiSchema ? contentType.uiSchema : {},
  }));
};
