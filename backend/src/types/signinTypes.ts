import zod from "zod"

export const signinSchemaType = zod.object({
    email: zod.string().email("provide valid email").trim().toLowerCase(),
    password: zod.string().min(6,"Password must have six characters"),
})