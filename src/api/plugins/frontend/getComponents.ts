import { RJSFSchema } from "@rjsf/utils";
import apiClient from "../../../utils/apiClient";

export type FrontendComponent = {
  id: number;
  entryPoint: string;
  componentName: string;
  propSchema?: RJSFSchema | null;
  pluginComponentId: number;
};

export type PluginComponent = {
  id: number;
  name: string;
  description?: string;
  type: "FRONTEND" | "BACKEND";
  function: string;
  pluginId: number;
  frontendComponent?: FrontendComponent;
};

export const getFrontendComponents = async (
  functionType: string,
  pluginId?: string
) => {
  const response = await apiClient.get<
    (PluginComponent & {
      frontendComponent: FrontendComponent;
    })[]
  >(`/plugins/frontend`, {
    params: {
      function: functionType,
      pluginId,
    },
  });

  return response.data;
};

export const placeComponentAsScript = async (id: string | number) => {
  const { data } = await apiClient.get<string>(`/plugins/frontend/${id}`);

  const script = document.createElement("script");
  script.innerHTML = data;
  script.type = "module";
  document.body.appendChild(script);
};
