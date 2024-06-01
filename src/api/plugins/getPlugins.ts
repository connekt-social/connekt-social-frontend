import apiClient from "../../utils/apiClient";

export type PluginDetails = {
  id: number;
  name: string;
  description: string;
  version: string;
  url: string | null;
  installationStatus: "INSTALLED" | "NOT_INSTALLED" | "PENDING";
  enabled: boolean;
  logoUrl: string | null;
  settings: object | null;
  settingsSchema: object | null;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
};
export const getPlugins = async () => {
  const response = await apiClient.get<PluginDetails[]>("/plugins");

  return response.data;
};

export const getPlugin = async (id: number | string) => {
  const response = await apiClient.get<PluginDetails>(`/plugins/${id}`);

  return response.data;
};
