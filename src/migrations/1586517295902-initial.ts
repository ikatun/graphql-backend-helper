/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1586517295902 implements MigrationInterface {
    name = 'initial1586517295902'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "facebook_user" ("id" SERIAL NOT NULL, "email" text, "externalFacebookUserId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "UQ_864a81cc1aa4fb4c9ef0acb94fb" UNIQUE ("email"), CONSTRAINT "REL_01a740f2ec7df679ba79d3a86a" UNIQUE ("userId"), CONSTRAINT "PK_26a5bca228153435d0cd003796e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "contentBase64" text NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_b2d8e683f020f61115edea206b" UNIQUE ("userId"), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "role" character varying NOT NULL DEFAULT 'USER', "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "email_password_user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "verificationCode" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "UQ_ae0a576d53072bebdf708453baf" UNIQUE ("email"), CONSTRAINT "REL_bc6efd854b5c7d49ed37fd66c5" UNIQUE ("userId"), CONSTRAINT "PK_2a3872871cd374dba800c75c9b7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "facebook_user" ADD CONSTRAINT "FK_01a740f2ec7df679ba79d3a86aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "email_password_user" ADD CONSTRAINT "FK_bc6efd854b5c7d49ed37fd66c5d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "email_password_user" DROP CONSTRAINT "FK_bc6efd854b5c7d49ed37fd66c5d"`, undefined);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_b2d8e683f020f61115edea206b3"`, undefined);
        await queryRunner.query(`ALTER TABLE "facebook_user" DROP CONSTRAINT "FK_01a740f2ec7df679ba79d3a86aa"`, undefined);
        await queryRunner.query(`DROP TABLE "email_password_user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "file"`, undefined);
        await queryRunner.query(`DROP TABLE "facebook_user"`, undefined);
    }

}
