import { Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "@/lib/auth";

export class AuthService {
    public getSession = async (req: Request, res: Response) => {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        return session;
    };
}