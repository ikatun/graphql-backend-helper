import {EntityManager} from "typeorm";
import {EmailPasswordUser} from "../models/EmailPasswordUser";
import {ValidationError} from "../../server/validation-error";

export async function verifyEmail(verificationCode: string, em: EntityManager) {
  const user = await em.findOne(EmailPasswordUser, { where: { verificationCode } });
  if (!user) {
    throw new ValidationError('Invalid verification code', { code: 'Invalid verification code' }, 400);
  }

  user.verificationCode = null;
  return await em.save(user);
}
