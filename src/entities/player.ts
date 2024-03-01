import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { Category } from "./category";
import { Transaction } from "./transaction";
import { History } from "./history";


@Entity()
export class Player {
  @PrimaryColumn({ length: 25 })
  player_id: string;


  @Column({ length: 25 })
  user_id: string;

  @Column({ length: 15 })
  favorite: string;

  @ManyToOne(() => User, user => user.players)
  user: User;

  @ManyToOne(() => Category, category => category.players)
  favoriteCategory: Category;

  @OneToMany(() => Transaction, transaction => transaction.player)
  transactions: Transaction[];

  @OneToMany(() => History, history => history.historyPlayer)
  histories: History[];
}
