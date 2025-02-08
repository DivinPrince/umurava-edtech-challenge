import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/lib/utils/app-error';
import { HTTPSTATUS } from '@/config/http.config';
import { AuthService } from "@/modules/auth/auth.module";

const authService = new AuthService()
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await authService.getSession(req, res)
        if (!session || session.user.role !== "admin") {
            throw new AppError("Unauthorized - Admin access required", HTTPSTATUS.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        next(error);
    }
};
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await authService.getSession(req, res)
        if (!session) {
            throw new AppError("Unauthorized", HTTPSTATUS.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        next(error);
    }
};
export const requireOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params
        const session = await authService.getSession(req, res)
        if (!session || (session.user.id !== userId && session.user.role !== "admin")) {
            throw new AppError("Unauthorized - Only owner or admin can access this resource", HTTPSTATUS.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        next(error);
    }
};