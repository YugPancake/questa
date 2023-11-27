import type { RequestHandler } from './$types';
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) return fail(401);
  await auth.invalidateSession(session.sessionId);
  locals.auth.setSession(null);
  throw redirect(302, '/login');
};
