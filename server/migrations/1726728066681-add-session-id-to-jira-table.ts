import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSessionIdToJiraTable1726728066681
  implements MigrationInterface
{
  name = 'AddSessionIdToJiraTable1726728066681';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jira" ADD "session_id" uuid NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jira" DROP COLUMN "session_id"`);
  }
}
