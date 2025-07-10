import { NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import { Users } from '@/models/Users'
import { tokenGenerator } from '@/utils/tokenGenerator'
import bcrypt from 'bcrypt'

export const POST = async (req: Request) => {
  try {
    const data = await req.json()
    const email_or_phone = data?.email_or_phone
    const password = data?.password

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
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password.toString(), 10)

    // create user with hashed password
    const user = await Users.create({ email_or_phone, password: hashedPassword })

    // token generate
    const access_token = tokenGenerator(user, 'access')
    const refresh_token = tokenGenerator(user, 'refresh')

    //   return response
    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user?._id,
        email_or_phone: user?.email_or_phone,
      },
      access_token,
      refresh_token,
    })
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 },
    )
  }
}
