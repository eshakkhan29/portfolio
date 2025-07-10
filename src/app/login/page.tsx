'use client'
import Button from '@/components/Button'
import Input from '@/components/UI/Input'
import api from '@/lib/axiosInstance'
import { setCookie } from 'cookies-next'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function LoginPage() {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email_or_phone: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const { data } = await api.post('/auth/signin', values)
        //   set token to cookie time 1 day
        setCookie('access_token', data.access_token, { maxAge: 60 * 60 * 24 })
        //   set refresh token to cookie time 7 days
        setCookie('refresh_token', data.refresh_token, { maxAge: 60 * 60 * 24 * 7 })
        router.push('/admin')
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        toast.error(error?.response?.data?.message || 'Something went wrong')
      }
    },
  })
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="mx-auto w-full lg:w-1/3">
        <Input
          type="text"
          onChange={formik.handleChange}
          name="email_or_phone"
          placeholder="Email or Phone"
        />
        <Input type="number" onChange={formik.handleChange} name="password" placeholder="******" />
        <Button
          disabled={loading}
          loading={loading}
          color="primary"
          variant="solid"
          type="submit"
          className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
