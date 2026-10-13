import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded.' },
        { status: 400 }
      );
    }

    // Validate image format - accept modern image mime types or image extensions
    const validMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'image/avif',
      'image/x-icon',
      'image/vnd.microsoft.icon',
      'image/bmp',
      'image/jfif',
      'image/tiff',
      'image/apng',
    ];
    const ext = (path.extname(file.name) || '').toLowerCase();
    const validExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.webp',
      '.svg',
      '.gif',
      '.avif',
      '.ico',
      '.bmp',
      '.jfif',
      '.tif',
      '.tiff',
    ];

    const isMimeValid =
      file.type ? validMimes.includes(file.type.toLowerCase()) || file.type.startsWith('image/') : false;
    const isExtValid = validExtensions.includes(ext);

    if (!isMimeValid && !isExtValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Invalid image format. Supported formats: JPG, PNG, WEBP, AVIF, SVG, GIF, ICO, BMP.',
        },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate safe unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExt = ext || path.extname(file.name) || '.png';
    const cleanBase = path
      .basename(file.name, fileExt)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const fileName = `${cleanBase || 'image'}-${Date.now()}${fileExt}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully!',
      url: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Server failed to save uploaded file.' },
      { status: 500 }
    );
  }
}
