// types/next-auth.d.ts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, JWT, Session, AdapterUser } from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken: string;
  }

  interface JWT {
    accessToken: string;
  }

  interface Session {
    user: {
      accessToken: string;
    };
  }

  interface AdapterUser {
    accessToken: string;
  }
}
