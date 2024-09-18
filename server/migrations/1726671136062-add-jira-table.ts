import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJiraTable1726671136062 implements MigrationInterface {
    name = 'AddJiraTable1726671136062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jira" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "host" character varying NOT NULL, "email" character varying NOT NULL, "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_3138c62ba29cca6315f3aa88415" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jira"`);
    }

}
