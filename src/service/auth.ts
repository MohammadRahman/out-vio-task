import jwt from 'jsonwebtoken'
import { sendToken } from '../helpers'
interface InputI {
    email: string,
    password: string
}

export async function authService(input: InputI) {

    if (input.email && input.password) {
        const user = {
            email: input.email,
            password: input.password
        }
        return user;
    } else {
        throw new Error
    }
}

export async function privateRouteService() {
    const content = 'Private Route Content'
    return content
}
export async function publicRouteService() {
    const content = 'Public Route Content'
    return content
}