import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateJiraTable1726718546640 implements MigrationInterface {
  name = 'UpdateJiraTable1726718546640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jira" ADD "enable_sync" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "jira" ADD "mapping_fields" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jira" DROP COLUMN "mapping_fields"`);
    await queryRunner.query(`ALTER TABLE "jira" DROP COLUMN "enable_sync"`);
  }
}
