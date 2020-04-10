import {Arg, Ctx, Mutation, Query, Resolver} from 'type-graphql';

import { ValidationError } from '../../server/validation-error';
import { IRequestContext } from '../../shared/IRequestContext';
import { LoginResponse } from '../inputs/LoginResponse';
import {EmailPasswordUser} from "../../email-password-user/models/EmailPasswordUser";
import {EmailLoginInput} from "../inputs/EmailLoginInput";
import { signToken } from '../crypto';

@Resolver()
export class EmailPasswordLoginResolver {
  @Mutation(() => LoginResponse)
  public async emailLogin(
    @Arg('input') input: EmailLoginInput,
    @Ctx() ctx: IRequestContext,
  ): Promise<LoginResponse> {
    const { email, password } = input;

    const emailPasswordUser = await ctx.em.findOne(EmailPasswordUser, {
      email,
    });

    if (!emailPasswordUser || emailPasswordUser.verificationCode) {
      throw new ValidationError('Invalid email or password', {
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      }, 400);
    }

    if (!await emailPasswordUser.passwordMatches(password)) {
      throw new ValidationError('Invalid email or password', {
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      }, 400);
    }

    const token = signToken({ emailPasswordUserId: emailPasswordUser.id });
    ctx.response.cookie('token', token);
    ctx.user = await emailPasswordUser.user;
    return new LoginResponse(token, await emailPasswordUser.user);
  }
}
