  export interface SessionData {
    userData?: {
      email?:string,
      username?:string,
      sessionId: string;
      ip: string;
      location: string;
      browser: string;
      os: string;
      device: string;
      isLoggedIn: boolean;
      isAdmin?: boolean;
    };
    isLoggedIn?: boolean;
  }

declare global {
  namespace Express {
    interface Request {
      user: UserData;
    }
  }
}

