import { Static, Type } from "@sinclair/typebox";
import { envSchema } from "env-schema";

const schema = Type.Object({
    PORT: Type.Number({
        default: process.env.PORT
    }),
    DATABASE_URL: Type.String(),
    JWT_SECRET: Type.String({
        default: 'secret'
    }),
    REDIS_URL: Type.String({
        default: process.env.REDIS_URL,
    }),
    TIME_FOR_IP: Type.Number({
        default: process.env.TIME_FOR_IP// 60*60 * 1000 -1 hour
    }),
    MAX_HITS_FROM_IP: Type.Number({
        default: process.env.MAX_HITS_FROM_IP // 200 requests
    }),
    TIME_FOR_TOKEN: Type.Number({
        default: process.env.TIME_FOR_TOKEN // 60*60 * 1000 -1 hour
    }),
    MAX_HITS_FROM_TOKEN: Type.Number({
        default: process.env.MAX_HITS_FROM_TOKEN // 100 requests
    })
})

type Env = Static<typeof schema>


export const config = envSchema<Env>({
    schema,
    dotenv: true
})