import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTestQuestionAnswersTables1617740677556 implements MigrationInterface {
    name = 'CreateTestQuestionAnswersTables1617740677556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "answerOptionId" uuid, "questionId" uuid, "testId" uuid, CONSTRAINT "PK_376adcf5739803c71c22eece43b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "questionType" character varying NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "isCorrect" boolean NOT NULL, CONSTRAINT "PK_69dad60c2f58e523232f06f5d8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_questions_question" ("testId" uuid NOT NULL, "questionId" uuid NOT NULL, CONSTRAINT "PK_988c77d8cb8becbee58da42494e" PRIMARY KEY ("testId", "questionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21da142a525b221958bfac9bfd" ON "test_questions_question" ("testId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c4765474979216820ca0fbf844" ON "test_questions_question" ("questionId") `);
        await queryRunner.query(`CREATE TABLE "question_answer_options_answer_option" ("questionId" uuid NOT NULL, "answerOptionId" uuid NOT NULL, CONSTRAINT "PK_528b00d83c403038a4a720633cc" PRIMARY KEY ("questionId", "answerOptionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_20d7688a00c1373411886cf5c0" ON "question_answer_options_answer_option" ("questionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e392bd9559e4fae934d25144c8" ON "question_answer_options_answer_option" ("answerOptionId") `);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_a54477c60507455e2937faa17b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_d1adcfdb122d0e9ef8216cf52fd" FOREIGN KEY ("answerOptionId") REFERENCES "answer_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_d1b9efd6286e9c05ed43cf28ae4" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_e6afb701b63c6988ae1aadf376c" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_394889f330e608a61edd1163cdf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_questions_question" ADD CONSTRAINT "FK_21da142a525b221958bfac9bfd4" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_questions_question" ADD CONSTRAINT "FK_c4765474979216820ca0fbf8445" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_answer_options_answer_option" ADD CONSTRAINT "FK_20d7688a00c1373411886cf5c06" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_answer_options_answer_option" ADD CONSTRAINT "FK_e392bd9559e4fae934d25144c81" FOREIGN KEY ("answerOptionId") REFERENCES "answer_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_answer_options_answer_option" DROP CONSTRAINT "FK_e392bd9559e4fae934d25144c81"`);
        await queryRunner.query(`ALTER TABLE "question_answer_options_answer_option" DROP CONSTRAINT "FK_20d7688a00c1373411886cf5c06"`);
        await queryRunner.query(`ALTER TABLE "test_questions_question" DROP CONSTRAINT "FK_c4765474979216820ca0fbf8445"`);
        await queryRunner.query(`ALTER TABLE "test_questions_question" DROP CONSTRAINT "FK_21da142a525b221958bfac9bfd4"`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_394889f330e608a61edd1163cdf"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_e6afb701b63c6988ae1aadf376c"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_d1b9efd6286e9c05ed43cf28ae4"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_d1adcfdb122d0e9ef8216cf52fd"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_a54477c60507455e2937faa17b0"`);
        await queryRunner.query(`DROP INDEX "IDX_e392bd9559e4fae934d25144c8"`);
        await queryRunner.query(`DROP INDEX "IDX_20d7688a00c1373411886cf5c0"`);
        await queryRunner.query(`DROP TABLE "question_answer_options_answer_option"`);
        await queryRunner.query(`DROP INDEX "IDX_c4765474979216820ca0fbf844"`);
        await queryRunner.query(`DROP INDEX "IDX_21da142a525b221958bfac9bfd"`);
        await queryRunner.query(`DROP TABLE "test_questions_question"`);
        await queryRunner.query(`DROP TABLE "answer_option"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "test"`);
        await queryRunner.query(`DROP TABLE "student_answer"`);
    }

}
