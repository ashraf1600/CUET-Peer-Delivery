import { post } from "./handlers";

type UploadResponse = {
  success: boolean;
  message: string;
  data: {
    urls: string[];
  };
  error: null | string;
};

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("images", file); // Changed from 'file' to 'images' to match API expectation

  try {
    const response = await post<UploadResponse>(
      "/ext/file/upload/images",
      formData,
    );

    if (!response.data?.urls?.[0]) {
      throw new Error("File upload failed: No URL returned");
    }

    return response.data.urls[0];
  } catch (error) {
    throw new Error("File upload failed: " + (error as Error).message);
  }
};
