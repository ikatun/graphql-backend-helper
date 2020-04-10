import {Arg, Ctx, Mutation, Resolver} from 'type-graphql';

import { ValidationError } from '../../server/validation-error';
import { IRequestContext } from '../../shared/IRequestContext';
import { LoginResponse } from '../inputs/LoginResponse';
import {encryptString, signToken} from '../crypto';
import {FacebookLoginInput} from "../inputs/FacebookLoginInput";
import {getOrCreateFacebookUser} from "../../facebook-user/services/get-or-create-facebook-user";

@Resolver()
export class FacebookLoginResolver {
  @Mutation(() => LoginResponse)
  public async facebookLogin(
    @Arg('input') input: FacebookLoginInput,
    @Ctx() ctx: IRequestContext,
  ): Promise<LoginResponse> {
    const user = await ctx.em.transaction(em => getOrCreateFacebookUser(input, em));

    if (!user) {
      throw new ValidationError('Invalid facebook access token', {}, 400);
    }

    const { facebookAccessToken } = input;

    const token = signToken({
      encryptedFacebookAccessToken: encryptString(facebookAccessToken),
    });

    ctx.response.cookie('token', token);
    ctx.user = await user.user;

    return new LoginResponse(token, await user.user);
  }

  @Mutation(() => Boolean)
  public async logout(
    @Ctx() ctx: IRequestContext,
  ): Promise<boolean> {
    if (ctx.request.cookies.token) {
      ctx.response.clearCookie('token');
    }

    return true;
  }
}
