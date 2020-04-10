import { IAuthorizationChecker } from '../../authorization/IAuthorizationChecker';
import { IRequestContext } from '../../shared/IRequestContext';
import { UserRole } from '../../user/enums/UserRole';
import { FacebookUser } from '../models/FacebookUser';

export class FacebookUserAuth implements IAuthorizationChecker {
  public constructor(private facebookUser: FacebookUser) {
  }

  public async canRead(ctx: IRequestContext, field?: string) {
    return !!ctx.user;
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
