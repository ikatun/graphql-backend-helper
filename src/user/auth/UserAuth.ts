/* eslint-disable @typescript-eslint/no-unused-vars */
import {IAuthorizationChecker} from '../../authorization/IAuthorizationChecker';
import {IRequestContext} from '../../shared/IRequestContext';
import {UserRole} from '../enums/UserRole';
import {User} from '../models/User';

export class UserAuth implements IAuthorizationChecker {
  public constructor(private user: User) {
  }

  public async canRead(ctx: IRequestContext, field?: string) {
    return ctx.user?.role === UserRole.ADMIN || ctx.user?.id === this.user.id;
  }

  public async canManage(ctx: IRequestContext) {
    const { user } = ctx;
    if (!user) {
      return false;
    }

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    return false;
  }

  public async canPersist(ctx: IRequestContext) {
    return this.canManage(ctx);
  }

  public async canUpdate(ctx: IRequestContext) {
    return this.canManage(ctx);
  }

  public async canDelete(ctx: IRequestContext) {
    return this.canManage(ctx);
  }
}
