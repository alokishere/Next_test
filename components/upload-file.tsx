"use client";

import { Check, CircleX, CloudUpload } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UploadFile as UploadFileSchema, UploadFileType } from "@/lib/schema";
import { DeleteGalleryImage, UploadGalleryImage } from "@/action/action";
import { ImageType } from "@/app/page";

interface FileWithPreview extends File {
  preview: string;
}

export function UploadFile({
  existingGalleryImages,
}: {
  existingGalleryImages: ImageType[];
}) {
  const [uploadFiles, setUploadFiles] = useState<FileWithPreview[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);

  const { handleSubmit, watch, setValue } = useForm<UploadFileType>({
    resolver: zodResolver(UploadFileSchema),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0 && acceptedFiles.length < 6) {
        setUploadFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
        setValue("files", [...(watch("files") || []), ...acceptedFiles]);
      } else {
        console.error("Too many files to upload");
      }
    },
    [setValue, watch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 10240 * 1000,
    maxFiles: 10,
    onDrop,
  });

  useEffect(() => {
    return () => {
      uploadFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadFiles]);

  const removeFile = (name: string) => {
    const newFiles = uploadFiles.filter((file) => file.name !== name);
    setUploadFiles(newFiles);
    setValue("files", newFiles);
  };

  const removeAll = () => {
    setUploadFiles([]);
    setValue("files", []);
  };

  const toggleDeleteFile = (id: string) => {
    setDeleteFiles((prev) =>
      prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]
    );
  };

  const onSubmit = async (data: UploadFileType) => {
    try {
      setUploadLoading(true);
      const formData = new FormData();
      uploadFiles.forEach((file: File) => {
        formData.append("files", file);
      });
      const res = await UploadGalleryImage(formData);
      if (res.success) {
        removeAll();
      } else {
        console.error("Error uploading files");
      }
      setUploadLoading(false);
    } catch (error: unknown) {
      console.error(error);
      setUploadLoading(false);
    }
  };

  const deleteSelectedFiles = async () => {
    try {
      setDeleteLoading(true);
      const res = await DeleteGalleryImage(deleteFiles);
      if (res.success) setDeleteFiles([]);
      setDeleteLoading(false);
    } catch (error: unknown) {
      console.error(error);
      setDeleteLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-auto m-2 p-5 bg-gray-100 flex-shrink-0"
    >
      {/* Drag and Drop */}
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed p-10 text-sm ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <input {...getInputProps({ name: "files" })} />
        <CloudUpload className="h-10 w-10" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop files here, or click to select files</p>
        )}
      </div>

      <section className="mt-10 h-auto">
        <div className="flex items-center justify-center gap-5">
          {uploadFiles.length > 0 && (
            <button
              type="button"
              className="bg-red-500 w-fit p-2 text-white rounded-md md:text-base text-sm"
              onClick={removeAll}
            >
              Remove all files
            </button>
          )}
          <button
            type="submit"
            disabled={uploadLoading}
            className="bg-purple-500 w-fit p-2 text-white rounded-md md:text-base text-sm"
          >
            {uploadLoading ? "Uploading..." : "Upload all files"}
          </button>
        </div>

        {/* Accepted files */}
        <ul className="mb-5 mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-8">
          {uploadFiles.map((file) => (
            <li
              key={file.name}
              className="relative h-32 rounded-md shadow-lg cursor-default"
            >
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="h-full w-auto rounded-md object-contain cursor-default"
              />
              <button
                type="button"
                className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-white"
                onClick={() => removeFile(file.name)}
              >
                <CircleX className="h-5 w-5 transition-all duration-150 hover:fill-red-500" />
              </button>
              <p className="mt-2 text-[12px] font-medium text-stone-500">
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Existing files */}
        {existingGalleryImages.length > 0 && (
          <h4 className="font-bold mt-20 border-b-2 border-b-black">
            Existing Gallery Images
          </h4>
        )}
        <ul className="mb-5 mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-8">
          {existingGalleryImages.map((file) => (
            <li
              key={file._id}
              className={`relative h-32 rounded-md shadow-lg cursor-default ${
                deleteFiles.includes(file.public_id)
                  ? "bg-gray-400 opacity-100"
                  : ""
              }`}
            >
              <Image
                src={file.secure_url}
                alt={file.asset_id}
                width={150}
                height={100}
                className="h-full w-auto rounded-md object-contain cursor-default"
              />
              {deleteFiles.includes(file.public_id) ? (
                <button
                  type="button"
                  className="absolute -right-3 bottom-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 transition-colors hover:bg-white"
                  onClick={() => toggleDeleteFile(file.public_id)}
                >
                  <Check className="h-5 w-5 transition-all duration-150 hover:text-green-500 text-white" />
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-white"
                  onClick={() => toggleDeleteFile(file.public_id)}
                >
                  <CircleX className="h-5 w-5 transition-all duration-150 hover:fill-red-500 text-white" />
                </button>
              )}
            </li>
          ))}
        </ul>
        {deleteFiles.length > 0 && (
          <div className="flex justify-center items-center w-full">
            <button
              type="button"
              disabled={deleteLoading}
              className="bg-red-500 w-fit p-2 text-white rounded-md md:text-base text-sm"
              onClick={deleteSelectedFiles}
            >
              {deleteLoading ? "Deleting..." : "Delete selected files"}
            </button>
          </div>
        )}
      </section>
    </form>
  );
}
