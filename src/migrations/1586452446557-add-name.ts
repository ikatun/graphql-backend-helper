/* eslint-disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class addName1586452446557 implements MigrationInterface {
    name = 'addName1586452446557'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`, undefined);
    }

}
