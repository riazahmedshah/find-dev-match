import zod from "zod"

export const signupSchemaType = zod.object({
    firstName:zod.string().min(2, "First name must be atleats more than two characters").max(20,"First name must be less than 20 characters"),
    lastName:zod.string().optional(),
    email: zod.string().email("provide valid email").trim().toLowerCase(),
    password: zod.string().min(6,"Password must have six characters"),
    gender:zod.union([zod.literal("male"), zod.literal("female")]),
    age:zod.number().refine(val => val >= 18,{message:"Age should be greater that 17"}),
    skills:zod.string().array().max(10,"only 10 skills are allowed").optional(),
    imgUrl:zod.string().url({ message: "Invalid url" }).optional(),
    about:zod.string().max(200, "only 200 characters are allowed")
})