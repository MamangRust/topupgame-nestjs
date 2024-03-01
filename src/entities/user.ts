import DayjsUTC from "src/helpers/day.helper";
import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Administrator } from "./admin";
import { Player } from "./player";


@Entity()
export class User {
  @PrimaryColumn({ length: 25 })
  user_id: string;

  @Column({ length: 25 })
  name: string;

  @Column({ length: 25 })
  username: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ length: 20, default: "PENDING" })
  status: string;

  @Column()
  avatar: string;

  @Column({ length: 20, default: "+62813-0000-0000" })
  phone_number: string;

  @OneToOne(() => Administrator, administrator => administrator.user)
  administrator: Administrator;

  @OneToMany(() => Player, player => player.user)
  players: Player[];

  @BeforeInsert()
  async generateUserId() {
    const datePrefix = DayjsUTC().format("DDMMYY");

    this.user_id = `${datePrefix}-${Math.random().toString(36).slice(2, 9)}`
  }


}

