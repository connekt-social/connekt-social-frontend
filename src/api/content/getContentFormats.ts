import { RJSFSchema, UiSchema } from "@rjsf/utils";
import apiClient from "../../utils/apiClient";

export type ContentFormat = {
  code: string;
  name: string;
  description: string;
  schema?: RJSFSchema;
  uiSchema?: UiSchema;
};
export const getContentFormats = async () => {
  const response = await apiClient.get<ContentFormat[]>("/content/formats");

  return response.data.map((contentType) => ({
    ...contentType,
    uiSchema: contentType.uiSchema ? contentType.uiSchema : {},
  }));
};
