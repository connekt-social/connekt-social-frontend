import apiClient from "./apiClient";

/**
 * Uploads a file to the server.
 *
 * @param file - The file to be uploaded.
 * @returns The URL of the uploaded file.
 */
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<{
    url: string;
  }>("/content/file", formData);

  return response.data.url;
};
export default uploadFile;
