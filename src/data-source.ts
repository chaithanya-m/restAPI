import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entity/User";
import { Movie } from "./entity/Movie";

dotenv.config();

const {
  NODE_ENV = "development"
} = process.env;

// SQLite configuration doesn't need DB_HOST, DB_PORT, DB_USERNAME, or DB_PASSWORD
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "restapis_db.sqlite", // SQLite database file path
  synchronize: NODE_ENV === "development", // Auto-sync schema changes in development
  logging: NODE_ENV === "development", // Log SQL queries in development
  entities: [User, Movie],
  migrations: [__dirname + "/migration/*.ts"], // Adjust path if using JavaScript files
  subscribers: [],
});
