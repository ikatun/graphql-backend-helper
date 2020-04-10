import {decryptString, verifyToken} from "../../authentication/crypto";
import {EntityManager} from "typeorm";
import {EmailPasswordUser} from "../../email-password-user/models/EmailPasswordUser";
import {fetchFacebookInfo} from "../../facebook/services/fetch-facebook-info";
import {FacebookUser} from "../../facebook-user/models/FacebookUser";

export async function getUserFromToken(token: string, em: EntityManager) {
  const { emailPasswordUserId, encryptedFacebookAccessToken } = verifyToken(token);
  if (emailPasswordUserId) {
    return (await em.findOneOrFail(EmailPasswordUser, { where: { id: emailPasswordUserId }})).user;
  }

  if (encryptedFacebookAccessToken) {
    const facebookAccessToken = decryptString(encryptedFacebookAccessToken);
    const { id: externalFacebookUserId } = await fetchFacebookInfo(facebookAccessToken);

    return (await em.findOneOrFail(FacebookUser, { where: { externalFacebookUserId } })).user;
  }

  throw new Error('Invalid token data');
}
