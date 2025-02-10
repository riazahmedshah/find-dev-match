import zod from "zod"

export const connectRequestTypes = zod.object({
  toUserId:zod.string(),
  status: zod.enum(["interested", "ignored"]),
})

export const reviewRequestTypes = zod.object({
  requestId:zod.string(),
  status: zod.enum(["accepted", "rejected"]),
})