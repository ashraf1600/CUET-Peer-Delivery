import { post } from "./handlers";

// Maximum file size: 10MB in bytes
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;

type UploadResponse = {
  success: boolean;
  message: string;
  data: {
    urls: string[];
  };
  error: null | string;
};

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();

  // Append each file with the same field name
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await post<UploadResponse>(
      "/ext/file/upload/images",
      formData,
    );

    if (!response.data?.urls || response.data.urls.length === 0) {
      throw new Error("File upload failed: No URLs returned");
    }

    return response.data.urls;
  } catch (error) {
    throw new Error("File upload failed: " + (error as Error).message);
  }
};
