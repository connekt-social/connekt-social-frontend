import { RJSFSchema, UiSchema } from "@rjsf/utils";
import apiClient from "../../utils/apiClient";

export type ContentType = {
  id: number;
  name: string;
  description: string;
  schema?: RJSFSchema;
  uiSchema?: UiSchema;
  plugin: {
    name: string;
    id: number;
    version: string;
  };
};
export const getContentTypes = async (code?: string) => {
  const response = await apiClient.get<ContentType[]>("/content/types", {
    params: { code },
  });

  return response.data.map((contentType) => ({
    ...contentType,
    uiSchema: contentType.uiSchema ? contentType.uiSchema : {},
  }));
};
