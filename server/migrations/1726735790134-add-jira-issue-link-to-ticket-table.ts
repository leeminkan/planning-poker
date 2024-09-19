import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJiraIssueLinkToTicketTable1726735790134 implements MigrationInterface {
    name = 'AddJiraIssueLinkToTicketTable1726735790134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ADD "jira_issue_link" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "jira_issue_link"`);
    }

}
