import React from 'react'
import Button from '@/components/UI/Button'
import api from '@/lib/axiosInstance'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import Textarea from '@/components/UI/Textarea'

function AboutMeForm({ setReFetch, about }: any) {
  const formik = useFormik({
    initialValues: {
      about: about?.about || '',
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (about) {
          await api.put('/about-me?id=' + about?.id, values)
          toast.success('About me updated successfully')
        } else {
          await api.post('/about-me', values)
          toast.success('About me added successfully')
        }
        setReFetch((prev: any) => !prev)
        formik.resetForm()
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong')
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Textarea
        id="about"
        name="about"
        label="About me"
        onChange={formik.handleChange}
        value={formik.values.about}
        placeholder="Write your about me here"
        rows={10}
        required
      />
      <Button
        disabled={formik.isSubmitting || formik.values.about === ''}
        text="Add about"
        type="submit"
      />
    </form>
  )
}

export default AboutMeForm
