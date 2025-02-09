import zod from "zod"

export const connectRequestTypes = zod.object({
  toUserId:zod.string(),
  // status: zod.string().refine(val => ["interested", "ignored"].includes(val), {
  //   message: "Status must be either 'interested' or 'ignored'",
  // }),
  status: zod.enum(["interested", "ignored"]),
})