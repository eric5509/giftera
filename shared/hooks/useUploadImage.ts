import { uploadImageAction } from "@/app/serverActions/shared/uploadImageAction";
import { useMutation } from "@tanstack/react-query";

type UploadImageVariables = {
  bucket: string;
  file: File;
  folder?: string;
};

export const useUploadImage = () => {
  return useMutation<string, Error, UploadImageVariables>({
    mutationFn: ({ bucket, file, folder }) =>
      uploadImageAction(bucket, file, folder),
  });
};
