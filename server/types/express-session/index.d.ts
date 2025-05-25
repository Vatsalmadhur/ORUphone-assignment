
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userData?: {
      sessionId: string;
      username?: string;
      ip: string;
      location: string;
      browser: string;
      os: string;
      device: string;
      isAdmin?: boolean;
      isLoggedIn: boolean;
    };
    isLoggedIn?: boolean;
    isAdmin?: boolean;
  }
}

