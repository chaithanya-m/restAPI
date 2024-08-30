import { MigrationInterface, QueryRunner } from "typeorm";

export class Movies1724953633303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "movies" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "title" VARCHAR(255) NOT NULL,
                "description" TEXT NOT NULL,
                "director" VARCHAR(255) NOT NULL,
                "year" INTEGER NOT NULL,
                "rating" REAL NOT NULL,
                "image" VARCHAR(255) NOT NULL,
                "cast" TEXT NOT NULL,
                "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies";`);
    }
}
