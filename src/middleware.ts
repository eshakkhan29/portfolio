import { NextResponse, NextRequest } from 'next/server'
import api from './lib/axiosInstance'
import { setCookie } from 'cookies-next/server'

export const middleware = async (request: NextRequest) => {
  // Example: Redirect unauthenticated users
  const token = request.cookies.get('access_token')?.value || ''
  const refreshToken = request.cookies.get('refresh_token')?.value || ''

  // verify token
  const { data } = await api.post('/auth/token-verify', { token, type: 'access' })

  if (!data?.valid) {
    // get new token
    const { data } = await api.post('/auth/token-verify', { token: refreshToken, type: 'refresh' })
    if (data?.token) {
      // set cookie in browser using NextResponse
      setCookie('access_token', data?.token, { maxAge: 60 * 60 * 24 })
      return NextResponse.next()
      // response.cookies.set('access_token', String(data?.token), {
      //   path: '/',
      //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      // })
      // return response
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
