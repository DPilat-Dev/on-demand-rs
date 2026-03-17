import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request }) {
      // Always allow the login page through — prevents redirect loop
      if (request.nextUrl.pathname.startsWith('/admin/login')) return true;
      return !!auth?.user;
    },
  },
});
