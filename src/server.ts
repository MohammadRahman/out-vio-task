import { config } from "./utils/config"
import { createServer } from "./utils/createServer"
import { log } from "./utils/loger"
import { redisClient } from "./utils/redisClient"

async function startServer() {
    const server = createServer()

    const rClient = await redisClient()

    rClient.on('error', (err) => log.error(err))
    rClient.on('connect', () => log.info('redis client connected'))
    rClient.on('ready', () => log.info('redis client is ready to work with'))

    const port = config.PORT
    server.listen(port, () => {
        log.info(`server started at port ${port}`)
    })
}
startServer()