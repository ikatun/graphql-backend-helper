import {Arg, Ctx, Mutation, Resolver} from 'type-graphql';
import {EmailRegisterInput} from "../inputs/EmailRegisterInput";
import {IRequestContext} from "../../shared/IRequestContext";
import {emailRegister} from "../services/email-register";
import {EmailVerificationInput} from "../inputs/EmailVerificationInput";
import {verifyEmail} from "../services/verify-email";
import {LoginResponse} from "../../authentication/inputs/LoginResponse";
import { signToken } from '../../authentication/crypto';

@Resolver()
export class EmailPasswordUserRegisterResolver {
  @Mutation(() => Boolean)
  public async emailRegister(
    @Arg('input') input: EmailRegisterInput,
    @Ctx() ctx: IRequestContext,
  ): Promise<boolean> {
    await ctx.em.transaction(em => emailRegister(input, em));

    return true;
  }

  @Mutation(() => LoginResponse)
  public async verifyEmail(
    @Arg('input') input: EmailVerificationInput,
    @Ctx() ctx: IRequestContext,
  ): Promise<LoginResponse> {
    const emailPasswordUser = await verifyEmail(input.verificationCode, ctx.em);

    const token = signToken({
      emailPasswordUserId: emailPasswordUser.id,
    });

    ctx.response.cookie('token', token);
    ctx.user = await emailPasswordUser.user;
    return new LoginResponse(token, await emailPasswordUser.user);
  }
}
