import {MigrationInterface, QueryRunner} from "typeorm";

export class fix1645999177529 implements MigrationInterface {
    name = 'fix1645999177529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" DROP CONSTRAINT "UQ_4140728ad7094a2f70267d7b52b"`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD "name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD CONSTRAINT "UQ_0824512eb9ccb661310daa1601b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "updated_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP CONSTRAINT "UQ_0824512eb9ccb661310daa1601b"`);
        await queryRunner.query(`ALTER TABLE "user_details" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD "username" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD CONSTRAINT "UQ_4140728ad7094a2f70267d7b52b" UNIQUE ("username")`);
    }

}
