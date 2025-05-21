import FileUploader from '@/components/FileUploader'
import { imageToUrl } from '@/utils/imageToUrl'
import React, { useEffect, useState } from 'react'

function UploadIcon({ formik }: any) {
  const [icon, setIcon] = useState(null)
  useEffect(() => {
    const setIcon = async () => {
      formik.setFieldValue('icon', await imageToUrl(icon))
    }
    if (icon) setIcon()
  }, [icon])
  return (
    <div>
      <FileUploader setFile={setIcon} title="Upload Icon" />
    </div>
  )
}

export default UploadIcon
