import { NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import { Users } from '@/models/Users'
import bcrypt from 'bcrypt'
import { tokenGenerator } from '@/utils/tokenGenerator'

export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { email_or_phone, password } = body

    //   required data
    if (!email_or_phone || !password) {
      return NextResponse.json(
        { message: 'Email/phone and password are required' },
        { status: 400 },
      )
    }

    // connect to db
    await connectToDB()

    // Check if user exists
    const existingUser = await Users.findOne({ email_or_phone })
    if (!existingUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password.toString(), existingUser.password)
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 })
    }

    // token generate
    const access_token = tokenGenerator(existingUser, 'access')
    const refresh_token = tokenGenerator(existingUser, 'refresh')
    // token send
    return NextResponse.json({ access_token, refresh_token }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
