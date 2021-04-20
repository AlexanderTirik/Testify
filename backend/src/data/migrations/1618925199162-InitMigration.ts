import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1618925199162 implements MigrationInterface {
    name = 'InitMigration1618925199162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiresAt" bigint NOT NULL, "userId" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "answerOptionId" uuid, "questionId" uuid, "testId" uuid, CONSTRAINT "PK_376adcf5739803c71c22eece43b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "questionType" character varying NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "isCorrect" boolean NOT NULL, "questionId" uuid, CONSTRAINT "PK_69dad60c2f58e523232f06f5d8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "test_questions_question" ("testId" uuid NOT NULL, "questionId" uuid NOT NULL, CONSTRAINT "PK_988c77d8cb8becbee58da42494e" PRIMARY KEY ("testId", "questionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21da142a525b221958bfac9bfd" ON "test_questions_question" ("testId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c4765474979216820ca0fbf844" ON "test_questions_question" ("questionId") `);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_a54477c60507455e2937faa17b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_d1adcfdb122d0e9ef8216cf52fd" FOREIGN KEY ("answerOptionId") REFERENCES "answer_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_d1b9efd6286e9c05ed43cf28ae4" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_e6afb701b63c6988ae1aadf376c" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "FK_394889f330e608a61edd1163cdf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer_option" ADD CONSTRAINT "FK_cda1c6af66a3aa97ba20315298d" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_questions_question" ADD CONSTRAINT "FK_21da142a525b221958bfac9bfd4" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "test_questions_question" ADD CONSTRAINT "FK_c4765474979216820ca0fbf8445" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test_questions_question" DROP CONSTRAINT "FK_c4765474979216820ca0fbf8445"`);
        await queryRunner.query(`ALTER TABLE "test_questions_question" DROP CONSTRAINT "FK_21da142a525b221958bfac9bfd4"`);
        await queryRunner.query(`ALTER TABLE "answer_option" DROP CONSTRAINT "FK_cda1c6af66a3aa97ba20315298d"`);
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "FK_394889f330e608a61edd1163cdf"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_e6afb701b63c6988ae1aadf376c"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_d1b9efd6286e9c05ed43cf28ae4"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_d1adcfdb122d0e9ef8216cf52fd"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_a54477c60507455e2937faa17b0"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`DROP INDEX "IDX_c4765474979216820ca0fbf844"`);
        await queryRunner.query(`DROP INDEX "IDX_21da142a525b221958bfac9bfd"`);
        await queryRunner.query(`DROP TABLE "test_questions_question"`);
        await queryRunner.query(`DROP TABLE "answer_option"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "test"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "student_answer"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
