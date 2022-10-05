import { Express, Request, Response } from "express";
import { authHandler, privateRouteHandler, publicRouteHandler } from "../controller/auth";
import { validateRequest } from 'zod-express-middleware'
import { requestBody } from "../schema/auth";
import { requireSignIn } from "../middlewares";
import { limitIp, limitToken } from "../middlewares/reateLimit";
import { config } from "../utils/config";


export function routes(app: Express) {

    //! routes health check
    app.get('/api/health-check', (req: Request, res: Response) => {
        res.sendStatus(200)
    })
    //! get token
    app.post('/api/users', validateRequest(requestBody), authHandler)

    // !private route
    app.get('/api/private', requireSignIn, limitToken(config.TIME_FOR_TOKEN, config.MAX_HITS_FROM_TOKEN), privateRouteHandler)

    // !public route
    app.get('/api/public', limitIp(config.TIME_FOR_IP, config.MAX_HITS_FROM_IP), publicRouteHandler)
}

