import api from '@/lib/axiosInstance'
import toast from 'react-hot-toast'

export const imageToUrl = async (image: File | null): Promise<string | null> => {
  if (!image) return null

  try {
    const formData = new FormData()
    formData.append('file', image)

    const response = await api.post('/image', formData)
    return response.data?.filePath || null
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'File name is too long')
    return null
  }
}
