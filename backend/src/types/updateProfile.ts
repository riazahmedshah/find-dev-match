import zod from "zod"

export const updateProfileTypes = zod.object({
  firstName:zod.string().min(2, "First name must be atleats more than two characters").max(20,"First name must be less than 20 characters").optional(),
  lastName:zod.string().optional(),
  gender:zod.union([zod.literal("male"), zod.literal("female")]).optional(),
  age:zod.number().refine(val => val >= 18,{message:"Age should be greater that 17"}).optional(),
  skills:zod.string().array().max(10,"only 10 skills are allowed").optional(),
  imgUrl:zod.string().url({ message: "Invalid url" }).optional(),
})