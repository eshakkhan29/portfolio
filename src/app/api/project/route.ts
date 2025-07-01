import { connectToDB } from '@/lib/mongodb'
import { Projects } from '@/models/Projects'
import { NextResponse } from 'next/server'

// Create project
export async function POST(request: Request) {
  try {
    const data = await request.json()
    await connectToDB()
    const project = await Projects.create(data)
    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// get all projects
export const GET = async () => {
  try {
    await connectToDB()
    const projects = await Projects.find()
    return NextResponse.json({ projects }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// Update a project
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const data = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await connectToDB()

    const project = await Projects.findByIdAndUpdate(id, data, { new: true })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Project update successfully', project }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

// delete a project
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await connectToDB()
    await Projects.findByIdAndDelete(id)

    return NextResponse.json({
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
