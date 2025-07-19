import zod from "zod"

export const connectRequestTypes = zod.object({
  toUserId:zod.string(),
  status: zod.enum(["interested", "ignored"]),
});

export type createConnectionInput = zod.infer<typeof connectRequestTypes>

export const reviewRequestTypes = zod.object({
  requestId:zod.string(),
  status: zod.enum(["accepted", "rejected"]),
});

export type reviewRequestInput = zod.infer<typeof reviewRequestTypes>