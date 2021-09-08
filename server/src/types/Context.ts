import { Session, SessionData } from "express-session";
import { Request, Response } from "express";

export type Context = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
};
