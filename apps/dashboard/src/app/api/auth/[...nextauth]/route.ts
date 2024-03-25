import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import * as jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email === '' || credentials?.password === '') {
          return null;
        }

        const body = {
          email: credentials?.email || '',
          password: credentials?.password || '',
        };

        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.API_KEY || '',
          },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          const { user, accessToken } = await res.json();
          user.accessToken = accessToken;
          return user;
        }

        const error = await res.json();
        throw new Error(error.message);
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token }) {
      const tokenSign = jwt.sign(
        {
          name: token.name,
          email: token.email,
        },
        process.env.PRIVATE_KEY || '',
        {
          algorithm: 'RS256',
        },
      );

      token.accessToken = tokenSign;

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;

      return session;
    },
  },
};

const hanlder = NextAuth(authOptions);

export { hanlder as GET, hanlder as POST };
