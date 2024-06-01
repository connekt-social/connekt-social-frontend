import apiClient from "../../utils/apiClient";

export const updatePluginSettings = async (
  id: string | number,
  data: object
) => {
  const response = await apiClient.put<object>(`/plugins/${id}/settings`, {
    data,
  });

  return response.data;
};
