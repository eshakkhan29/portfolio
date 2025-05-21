"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import Text from "../Text";
import IconButton from "../IconButton/IconButton";
import Loader from "../Loader/Loader";

type Props = {
  setFile?: (files: File[]) => void;
  title?: string;
  name?: string;
  isError?: boolean;
  defaultImage?: string[]; // image URLs
  loading?: boolean;
};

const MultipleFileUploader = ({
  setFile,
  title,
  name,
  isError,
  defaultImage = [],
  loading = false,
}: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  useEffect(() => {
    if (uploadedFiles.length > 0 && setFile) {
      setFile(uploadedFiles);
    }
  }, [uploadedFiles, setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [], "image/jpeg": [] },
    multiple: true,
  });

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    setFile?.(newFiles);
  };

  const handleClearAll = () => {
    setUploadedFiles([]);
    setFile?.([]);
  };

  const renderFilePreviews = () => {
    return uploadedFiles.map((file, index) => {
      const fileUrl = URL.createObjectURL(file);
      return (
        <div key={index} className="relative">
          <Image
            src={fileUrl}
            alt={`uploaded-${index}`}
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFile(index);
            }}
            className="absolute top-[-6px] right-[-6px] bg-red-500 rounded-full p-1 text-white text-xs"
          >
            <FaTimes />
          </button>
        </div>
      );
    });
  };

  const renderDefaultImages = () => {
    return defaultImage.map((src, index) => (
      <div key={index} className="relative">
        <Image
          src={src}
          alt={`default-${index}`}
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded-md"
        />
      </div>
    ));
  };

  return (
    <div className={`w-full ${title ? "space-y-3" : ""}`}>
      {title && (
        <Text As="h1" size="2xl" weight="semibold">
          {title}
        </Text>
      )}

      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center border rounded-xl p-5 gap-3 cursor-pointer transition-all duration-200
          bg-white dark:bg-gray-800 border-lgray-300 dark:border-lgray
          ${
            isDragActive ? "shadow-primary-500 shadow dark:shadow-gray-300" : ""
          }
          ${isError ? "border-red-500" : ""}`}
      >
        {uploadedFiles.length > 0 && (
          <div className="absolute top-2 right-2">
            <IconButton
              size="xs"
              color="error"
              variant="pastel"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClearAll();
              }}
            >
              <FaTimes className="text-sm" />
            </IconButton>
          </div>
        )}

        <input type="file" name={name} multiple {...getInputProps()} />

        {loading ? (
          <Loader size={30} classNames="text-primary" />
        ) : (
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            {defaultImage.length > 0 && renderDefaultImages()}
            {uploadedFiles.length > 0 && renderFilePreviews()}
            {defaultImage.length === 0 && uploadedFiles.length === 0 && (
              <div className="border border-gray-300 dark:border-lgray rounded-lg shadow-md p-4 hover:scale-105 transition-all duration-300">
                <IoCloudUploadOutline className="text-lgray dark:text-gray-200 text-3xl" />
              </div>
            )}
          </div>
        )}

        <div className="w-full flex flex-col items-center justify-center gap-1">
          <Text As="p" size="sm" color="lgray" align="center">
            <span className="text-primary text-base font-bold">
              {isDragActive ? "Drop the files here" : "Click to upload"}
            </span>{" "}
            or drag and drop
          </Text>
          <Text As="p" size="sm" color="lgray" align="center">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </Text>
        </div>
      </div>
    </div>
  );
};

export default MultipleFileUploader;
