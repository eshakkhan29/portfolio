import { connectToDB } from '@/lib/mongodb'
import { AboutMe } from '@/models/AboutMe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await connectToDB()
    const aboutMe = await AboutMe.create(data)
    return NextResponse.json(
      { message: 'About Me added successfully', data: aboutMe },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// get about me data
export async function GET() {
  try {
    await connectToDB()
    const aboutMe = await AboutMe.find()
    return NextResponse.json({ id: aboutMe?.[0]?._id, about: aboutMe?.[0]?.about }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// update about me data
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const data = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await connectToDB()

    const aboutMe = await AboutMe.findByIdAndUpdate(id, data, { new: true })

    if (!aboutMe) {
      return NextResponse.json({ error: 'About Me not found' }, { status: 404 })
    }

    return NextResponse.json({ about: aboutMe }, { status: 200 })
  } catch (error: any) {
    console.error('PUT /about-me error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
