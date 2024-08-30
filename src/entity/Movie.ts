import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "movies" })
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  title!: string;

  @Column({ type: "text", nullable: false })
  description!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  director!: string;

  @Column({ type: "int", nullable: false })
  year!: number;

  @Column({ type: "float", nullable: false }) // Assuming rating is a number (e.g., 8.5)
  rating!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  image!: string;

  @Column("simple-array", { nullable: false }) // Assuming cast is an array of strings
  cast!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
