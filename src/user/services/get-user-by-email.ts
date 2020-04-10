import {EntityManager} from "typeorm";
import { User } from "../models/User";
import {EmailPasswordUser} from "../../email-password-user/models/EmailPasswordUser";
import {FacebookUser} from "../../facebook-user/models/FacebookUser";

export async function getUserByEmail(email: string, em: EntityManager): Promise<User | undefined> {
  const emailPasswordUser = await em.findOne(EmailPasswordUser, { where: { email } });
  if (emailPasswordUser) {
    return emailPasswordUser.user;
  }

  const facebookUser = await em.findOne(FacebookUser, { where: { email } });

  if (facebookUser) {
    return facebookUser.user;
  }

  return undefined;
}
