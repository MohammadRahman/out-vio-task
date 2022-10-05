import { NextFunction, Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { redisClient } from '../utils/redisClient'

export const limitIp = (ttl: number, hits: number) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = await redisClient()
        const ip = req.ip

        // ? this function also works
        // const requests = await client.incr(ip)
        // if (requests > hits) {
        //     await client.expire(ip, ttl)
        //     return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
        //         callsInHour: hits,
        //         left: hits - requests,
        //         nextHitIn: ttl + 'seconds'
        //     })
        // }

        //? reuseable function in action
        const response = await reuseableFunction({ client, ttl, hits, option: ip, })
        if (response) {
            return res.status(StatusCodes.TOO_MANY_REQUESTS).json(
                response
            )
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

export const limitToken = (ttl: number, maxLimit: number) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = await redisClient()

        const token = req.headers.authorization || '';

        //? one way pure function
        const numberOfToken = await client.incr(token)
        if (numberOfToken > maxLimit) {
            await client.expire(token, ttl)
            return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
                maxrequests: maxLimit,
                leftHits: maxLimit - numberOfToken,
                nextHitIn: ttl + 'seconds'

            })
        }

        //? un-comment from line 42-48 to see reuseable function in action
        // const response = await reuseableFunction({ client, ttl, hits: maxLimit, option: token, })
        // if (response) {
        //     return res.status(StatusCodes.TOO_MANY_REQUESTS).json(
        //         response
        //     )
        // }

        next()
    } catch (error) {
        console.log(error)
    }
}



// ? re-useble function

async function reuseableFunction({
    client, ttl, hits, option
}: {
    client: Awaited<ReturnType<typeof redisClient>>,
    hits: number,
    ttl: number
    option: string
}) {
    const hitsNumber = await client.incr(option)
    if (hitsNumber > hits) {
        await client.expire(option, ttl)
        return {
            maxrequests: hits,
            leftHits: hits - hitsNumber,
            nextHitIn: ttl + 'seconds'
        };
    }
}