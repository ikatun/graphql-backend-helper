import {IAuthorizationChecker} from '../../authorization/IAuthorizationChecker';
import {IRequestContext} from '../../shared/IRequestContext';
import {UserRole} from '../../user/enums/UserRole';
import {EmailPasswordUser} from '../models/EmailPasswordUser';

export class EmailPasswordUserAuth implements IAuthorizationChecker {
  public constructor(private emailPasswordUser: EmailPasswordUser) {
  }

  public async canRead(ctx: IRequestContext, field?: string) {
    return ctx.user?.role === UserRole.ADMIN || ctx.user?.id === this.emailPasswordUser.id;
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
