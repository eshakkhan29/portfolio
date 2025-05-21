import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_cloud_name,
  api_key: process.env.NEXT_PUBLIC_api_key,
  api_secret: process.env.NEXT_PUBLIC_api_secret,
})

// Upload image
export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Convert file to base64
    const buffer = Buffer.from(await file.arrayBuffer())
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`

    // Upload to Cloudinary
    const uploadResponse: any = await cloudinary.uploader.upload(base64Image, {
      folder: 'images',
    })
    return NextResponse.json(
      {
        message: 'File uploaded successfully',
        filePath: uploadResponse.secure_url,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
