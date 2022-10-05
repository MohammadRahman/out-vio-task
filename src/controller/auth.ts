import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { AuthI } from "../schema/auth";
import { authService, privateRouteService, publicRouteService } from "../service/auth";
import { sendToken } from '../helpers';
import { redisClient } from '../utils/redisClient';
import redis from 'redis'



interface Ipi {
    ip: string | number
}

export async function authHandler(req: Request<{}, {}, AuthI['body']>, res: Response) {
    try {
        const user = await authService(req.body)
        const accessToken = sendToken(user)
        return res.status(StatusCodes.OK).json({
            accessToken
        })
    } catch (error) {
        throw new Error
    }
}

export async function privateRouteHandler(req: Request, res: Response) {
    const content = await privateRouteService()
    return res.json(content)
}
export async function publicRouteHandler(req: Request, res: Response) {
    const ip = req.connection.remoteAddress || req.ip
    console.log(ip)
    const content = await publicRouteService()
    return res.json({
        content,
    })
}