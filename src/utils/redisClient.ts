
import redis from "ioredis";
import { config } from "./config";
import { log } from "./loger";



export async function redisClient() {

    const client = redis.createClient()

    return client;
}