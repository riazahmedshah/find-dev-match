import zod from "zod"
import { findUserByEmail } from "../repositories/UserRepository";

const email_base_schema = zod.string().email("INVALID_EMAIL").trim().toLowerCase();

const email_schema = email_base_schema.refine(async(email) => {
  const doesUserExists = await findUserByEmail(email);
  return !doesUserExists
}, "USER_ALREADY_EXISTS");

const first_name_schema = zod.string().min(2, "First name must be atleats more than two characters").max(20,"First name must be less than 20 characters");

const age_schema = zod.number()
  .refine(val => val >= 18,{
  message:"Age should be greater that 17"
})

export const userSchema= zod.object({
    firstName:first_name_schema,
    lastName:zod.string().optional(),
    email: email_schema,
    password: zod.string().min(6,"Password must have six characters"),
    gender:zod.union([zod.literal("male"), zod.literal("female")]),
    age:age_schema,
    skills:zod.string().array().max(10,"only 10 skills are allowed").optional(),
    profilePhoto:zod.string().optional(),
    about:zod.string().max(200, "only 200 characters are allowed").optional(),
})

export type createUserInput = zod.infer<typeof userSchema>

export const signinSchema = zod.object({
  email: zod.string().email("provide valid email").trim().toLowerCase(),
  password: zod.string().min(6,"Password must have six characters"),
})

export const updateUserSchema = userSchema.omit({email:true, password:true});

export type updateUserInput = zod.infer<typeof updateUserSchema>