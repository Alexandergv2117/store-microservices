import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

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
          const { user } = await res.json();
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {},
};

const hanlder = NextAuth(authOptions);

export { hanlder as GET, hanlder as POST };