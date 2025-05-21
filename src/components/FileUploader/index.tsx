'use client'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { FaTimes } from 'react-icons/fa'
import Loader from '../Loader/Loader'

const FileUploader = ({
  setFile,
  title,
  name,
  isError,
  defaultImage,
  loading,
}: {
  setFile?: (file: any) => void
  title?: string
  name?: string
  isError?: any
  defaultImage?: any
  loading?: boolean
}) => {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles)
  }, [])

  React.useEffect(() => {
    if (uploadedFiles.length > 0 && setFile) {
      setFile(uploadedFiles[0])
    }
  }, [setFile, uploadedFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': [], 'image/jpeg': [] },
  })

  return (
    <div className={`w-full ${title && 'space-y-3'}`}>
      {/* Header Section */}
      {title && (
        <div>
          <p>{title}</p>
        </div>
      )}

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`bg-primary border-border-border relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border p-5 transition-all duration-200 ${
          isDragActive ? 'shadow-primary-500 shadow dark:shadow-gray-300' : ''
        } ${isError && 'border-red-500'}`}>
        {/* clare selected file */}
        {uploadedFiles?.length > 0 && (
          <div className="absolute top-2 right-2">
            <button
              onClick={(e: any) => {
                e.preventDefault()
                e.stopPropagation()
                setUploadedFiles([])
                setFile?.(null)
              }}>
              <FaTimes className="text-sm" />
            </button>
          </div>
        )}

        {/* Input for File Selection */}
        <input type="file" name={name} {...getInputProps()} />

        {/* Upload Icon or Upload file Preview */}
        {loading ? (
          <div className="flex h-[64px] w-[64px] items-center justify-center rounded-md bg-gray-100">
            <Loader size={30} classNames="text-primary" />
          </div>
        ) : (
          <div>
            {uploadedFiles[0] || defaultImage ? (
              <Image
                src={uploadedFiles[0] ? URL.createObjectURL(uploadedFiles[0]) : defaultImage || ''}
                alt="UploadedFile"
                className="h-16 w-16 rounded-md object-cover"
                width={1000}
                height={1000}
              />
            ) : (
              <div className="border-border rounded-lg border p-4 shadow-md">
                <IoCloudUploadOutline className="text-primary-content text-3xl" />
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="text-primary-content flex w-full flex-col items-center justify-center gap-1">
          <p>
            <span className="text-green-500">
              {isDragActive ? 'Drop the files here' : 'Click to upload'}
            </span>{' '}
            or drag and drop
          </p>
          <p>Supported Format: PNG, JPG</p>
        </div>
      </div>
    </div>
  )
}

export default FileUploader
