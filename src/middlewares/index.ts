import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes'


export function requireSignIn(req: Request, res: Response, next: NextFunction) {
    const token = (req.headers.authorization)?.replace(/^Bearer\s/, "")
    if (!token) {
        return res.sendStatus(StatusCodes.FORBIDDEN)
    };
    return next();
}
