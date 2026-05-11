// app/api/like/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { updateBlogLikes } from '../../lib/strapi';

export async function POST(request: NextRequest) {
  try {
    const { documentId, currentLikes } = await request.json();

    if (!documentId) {
      return NextResponse.json({ error: 'documentId is required' }, { status: 400 });
    }

    // Update likes in Strapi
    const newLikes = await updateBlogLikes(documentId, currentLikes + 1);

    return NextResponse.json({ success: true, likes: newLikes });
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json({ error: 'Failed to process like' }, { status: 500 });
  }
}