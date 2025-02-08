import { z } from 'zod';

declare global {
  namespace Express {
    interface Request {
      cleanBody: any;
      cleanQuery: any;
    }
  }
}

export {}; 