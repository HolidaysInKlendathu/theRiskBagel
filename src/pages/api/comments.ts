import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';
import { pb } from '../../lib/pocketbase';

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!pb.authStore.isValid) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { articleId, content } = await request.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        articleId,
        userId: pb.authStore.model?.id,
      },
    });

    return new Response(JSON.stringify(comment), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}