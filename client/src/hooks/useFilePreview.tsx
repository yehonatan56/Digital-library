import { useState, useEffect } from "react";

export const useFilePreview = (
  file: File | null,
  defaultValue: string | undefined = undefined,
): string | null => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl =
      file && typeof file !== "string" ? URL.createObjectURL(file) : file;

    setPreview(objectUrl || defaultValue || null);

    // free memory when this component is unmounted
    return () => {
      if (objectUrl && typeof file !== "string") {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file, defaultValue]);

  return preview;
};
