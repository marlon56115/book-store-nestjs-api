import {MigrationInterface, QueryRunner} from "typeorm";

export class secondMigration1645985660513 implements MigrationInterface {
    name = 'secondMigration1645985660513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99b019339f52c63ae615358738"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13380e7efec83468d73fc37938"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_13380e7efec83468d73fc37938e" PRIMARY KEY ("rolesId")`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "rolesId"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_87b8888186ca9769c960e926870" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "role_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY ("user_id", "role_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_23ed6f04fe43066df08379fd034"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_87b8888186ca9769c960e926870" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "rolesId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_13380e7efec83468d73fc37938e" PRIMARY KEY ("rolesId")`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "usersId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "PK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId")`);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
