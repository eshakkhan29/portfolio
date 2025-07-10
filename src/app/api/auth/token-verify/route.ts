import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { Users } from '@/models/Users'
import { tokenGenerator } from '@/utils/tokenGenerator'

interface TokenPayload {
  uid: string
  vfs: string
}

export const POST = async (request: Request) => {
  try {
    const { token, type } = await request.json()
    const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!) as TokenPayload

    const user = await Users.findOne({ _id: data.uid })
    if (!user) {
      return NextResponse.json({ message: 'User not found', valid: false }, { status: 404 })
    }
    if (type === 'refresh') {
      const newToken = tokenGenerator(user, 'access')
      return NextResponse.json({ token: newToken, message: 'Token updated' }, { status: 200 })
    }
    return NextResponse.json({ message: 'Valid token', valid: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token', valid: false }, { status: 200 })
  }
}
