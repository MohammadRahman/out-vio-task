import { object, string, TypeOf } from 'zod'

export const requestBody = {
    body: object({
        email: string({ required_error: 'email is required' }).email('Enter a valid email').min(1),
        password: string({ required_error: 'password is required' }).min(5)
    })
}

export const authSchema = object({
    ...requestBody
})

export type AuthI = TypeOf<typeof authSchema>