import { MigrationInterface, QueryRunner } from "typeorm";

export class Movies1724953633303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            --Table Definition
            CREATE TABLE movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                director TEXT NOT NULL,
                year INTEGER NOT NULL,
                rating TEXT NOT NULL,
                image TEXT NOT NULL,
                cast TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );

              `),
          undefined;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies"`, undefined);
    }

}
