import { connectToDB } from '@/lib/mongodb'
import { Services } from '@/models/services'
import { NextResponse } from 'next/server'

// Create service
export async function POST(request: Request) {
  try {
    const data = await request.json()
    await connectToDB()
    const service = await Services.create(data)
    return NextResponse.json({ service }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// get all service
export const GET = async () => {
  try {
    await connectToDB()
    const service = await Services.find()
    return NextResponse.json({ service }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// Update service
export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const data = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await connectToDB()

    const service = await Services.findByIdAndUpdate(id, data, { new: true })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Service update successfully', service }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

// delete a service
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await connectToDB()
    await Services.findByIdAndDelete(id)

    return NextResponse.json({
      message: 'Service deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
