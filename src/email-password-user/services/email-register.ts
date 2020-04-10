import {EntityManager} from "typeorm";
import cryptoRandomString from 'crypto-random-string';
import env from 'env-var';

import {EmailRegisterInput} from "../inputs/EmailRegisterInput";
import {getUserByEmail} from "../../user/services/get-user-by-email";
import {User} from "../../user/models/User";
import {EmailPasswordUser} from "../models/EmailPasswordUser";
import {ValidationError} from "../../server/validation-error";
import {hashPassword} from "../../authentication/crypto";
import {sendEmail} from "../../email/services/send-email";

const EMAIL_VERIFICATION_REQUIRED = env.get('EMAIL_VERIFICATION_REQUIRED').required().asBool();

export async function emailRegister(data: EmailRegisterInput, em: EntityManager) {
  const { email, password, name } = data;

  const existingUser = await em.findOne(EmailPasswordUser, { where: { email }});
  if (existingUser && existingUser.verificationCode) {
    throw new ValidationError('User already exists', { email: 'User already exists' }, 400);
  }

  const user = await getUserByEmail(email, em) || new User();
  user.name = name;
  await em.save(user);

  const emailPasswordUser = existingUser || new EmailPasswordUser();
  emailPasswordUser.user = Promise.resolve(user);
  emailPasswordUser.email = email;
  emailPasswordUser.passwordHash = await hashPassword(password);

  if (EMAIL_VERIFICATION_REQUIRED) {
    const verificationCode = cryptoRandomString({length: 8, type: 'distinguishable'});
    emailPasswordUser.verificationCode = verificationCode;
    await em.save(emailPasswordUser);
    await sendEmail(email, 'Verification code', `Verification code: ${verificationCode}`);
  }

  return await em.save(emailPasswordUser);
}
