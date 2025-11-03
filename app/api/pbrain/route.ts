import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const comment = body?.comment?.body || '';
  if (!comment.startsWith('/pbrain')) return new NextResponse('OK', { status: 200 });

  const question = comment.slice(7).trim();
  const issueUrl = body.issue.html_url;

  // Post comment to GitHub (fire and forget)
  fetch('https://api.github.com/repos/stringth30ry/pbrain/issues/1/comments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      body: `🧠 **pbrain is thinking…**\n\n> ${question}\n\nI'll reply in 12 seconds with the commit that broke it.\n\n(Real version coming in Step 3)`,
    }),
  }).catch((err) => {
    // Log error but don't block response
    console.error('Failed to post GitHub comment:', err);
  });

  return new NextResponse('OK', { status: 200 });
}