import { connectToDB } from '@/lib/mongodb'
import { Skills } from '@/models/Skills'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await connectToDB()
    const skill = await Skills.create(data)
    return NextResponse.json({ skill }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// get all Skills
export async function GET() {
  try {
    await connectToDB()
    const skills = await Skills.find()
    return NextResponse.json({ skills }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// delete a skills
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await connectToDB()
    await Skills.findByIdAndDelete(id)

    return NextResponse.json({
      message: 'Skill deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
