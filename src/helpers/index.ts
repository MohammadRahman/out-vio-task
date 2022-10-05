import { config } from "../utils/config";
import jwt from 'jsonwebtoken'


export function sendToken(payload: string | Buffer | object) {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "15min" });
}
