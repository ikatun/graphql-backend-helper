import {EntityManager} from "typeorm";
import {FacebookUser} from "../models/FacebookUser";
import {getUserByEmail} from "../../user/services/get-user-by-email";
import {User} from "../../user/models/User";
import {FacebookLoginInput} from "../../authentication/inputs/FacebookLoginInput";
import {fetchFacebookInfo, IFacebookApiResponse} from "../../facebook/services/fetch-facebook-info";


async function createFacebookUser(data: IFacebookApiResponse, em: EntityManager): Promise<FacebookUser> {
  const user = await getUserByEmail(data.email, em) || new User();
  if (!user.name) {
    user.name = data.name;
  }
  await em.save(user);

  const facebookUser = new FacebookUser();
  facebookUser.user = Promise.resolve(user);
  facebookUser.email = data.email;
  facebookUser.externalFacebookUserId = data.id;

  return em.save(facebookUser);
}

export async function getOrCreateFacebookUser(args: FacebookLoginInput, em: EntityManager): Promise<FacebookUser> {
  const { facebookAccessToken } = args;

  const fbResponse = await fetchFacebookInfo(facebookAccessToken);

  return await em.findOne(FacebookUser, { where: { externalFacebookUserId: fbResponse.id } }) ||
    await createFacebookUser(fbResponse, em);
}
