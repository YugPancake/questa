import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import prismaClient from '$lib/server/prisma';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
  adapter: prisma(prismaClient),
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  getUserAttributes: (data) => {
    return {
      name: data.name,
      email: data.email,
    };
  },
});

export type Auth = typeof auth;
