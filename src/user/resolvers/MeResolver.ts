import {IRequestContext} from "../../shared/IRequestContext";
import {Ctx, Query} from "type-graphql";
import {User} from "../models/User";

export class MeResolver {
  @Query(() => User)
  me(@Ctx() ctx: IRequestContext) {
    return ctx.user;
  }
}
