import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJiraInfoToTicketTable1726720398304
  implements MigrationInterface
{
  name = 'AddJiraInfoToTicketTable1726720398304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tickets" ADD "jira_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD "jira_issue_id" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP COLUMN "jira_issue_id"`,
    );
    await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "jira_id"`);
  }
}
