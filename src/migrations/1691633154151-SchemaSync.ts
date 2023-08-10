import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1691633154151 implements MigrationInterface {
    name = 'SchemaSync1691633154151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying`);
    }

}
