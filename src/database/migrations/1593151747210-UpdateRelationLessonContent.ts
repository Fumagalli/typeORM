import { MigrationInterface, QueryRunner } from 'typeorm';

export default class UpdateRelationLessonContent1593151747210
  implements MigrationInterface {
  name = 'UpdateRelationLessonContent1593151747210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "content" ADD "lessonId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "content" ADD CONSTRAINT "FK_0b349f6b8ca7f05eed39ffb956d" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content" DROP CONSTRAINT "FK_0b349f6b8ca7f05eed39ffb956d"`,
    );
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "lessonId"`);
  }
}
