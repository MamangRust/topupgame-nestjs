import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, Length } from "class-validator";


@Entity()
export class Administrator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 255)
  fullName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;


}
