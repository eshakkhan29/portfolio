import React from 'react'
import Button from '@/components/UI/Button'
import Input from '@/components/UI/Input'
import api from '@/lib/axiosInstance'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import UploadIcon from './UploadIcon'

function SkillsForm({ setReFetch }: any) {
  const formik = useFormik({
    initialValues: {
      name: '',
      icon: '',
    },
    onSubmit: async (values) => {
      try {
        await api.post('/skills', values)
        toast.success('Skill added successfully')
        setReFetch((prev: any) => !prev)
        formik.resetForm()
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong')
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        type="text"
        id="name"
        name="name"
        label="Skill name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <UploadIcon formik={formik} />
      <Button
        disabled={formik.isSubmitting || formik.values.icon === ''}
        text="Add skill"
        type="submit"
      />
    </form>
  )
}

export default SkillsForm
