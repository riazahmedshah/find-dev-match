import zod from "zod"
import { findUserById } from "../repositories/UserRepository";

const user_id_schema = zod.string().refine(async(id) => {
  const doesUserExists = await findUserById(id);
  return Boolean(doesUserExists)
},"USER_NOT_FOUND");

export const connectRequestTypes = zod.object({
  toUserId:user_id_schema,
  status: zod.enum(["interested", "ignored"]),
});

export type createConnectionInput = zod.infer<typeof connectRequestTypes>

export const reviewRequestTypes = zod.object({
  requestId:zod.string(),
  status: zod.enum(["accepted", "rejected"]),
});

export type reviewRequestInput = zod.infer<typeof reviewRequestTypes>