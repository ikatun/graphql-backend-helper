/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";
import {User} from "../user/models/User";
import {UserRole} from "../user/enums/UserRole";
import {EmailPasswordUser} from "../email-password-user/models/EmailPasswordUser";
import {hashPassword} from "../authentication/crypto";

export class addDefaultAdmin1586517858218 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      const user = new User();
      user.name = 'Super Admin';
      user.role = UserRole.ADMIN;
      await queryRunner.connection.manager.save(user);

      const emailPasswordUser = new EmailPasswordUser();
      emailPasswordUser.user = Promise.resolve(user);
      emailPasswordUser.email = "admin@mycompany.com";
      emailPasswordUser.passwordHash = await hashPassword('password');
      await queryRunner.connection.manager.save(emailPasswordUser);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
