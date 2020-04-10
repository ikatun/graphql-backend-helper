/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUser1586434183328 implements MigrationInterface {
    name = 'updateUser1586434183328'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "email_password_user" ADD "verificationCode" text`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "email_password_user" DROP COLUMN "verificationCode"`, undefined);
    }

}
