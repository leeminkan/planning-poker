import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPointColumnToTicket1726562762054 implements MigrationInterface {
  name = 'AddPointColumnToTicket1726562762054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tickets" ADD "point" smallint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "point"`);
  }
}
