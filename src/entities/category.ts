import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Voucher } from "./voucher";
import { Player } from "./player";
import { Transaction } from "./transaction";


@Entity()
export class Category {
  @PrimaryColumn({ length: 15 })
  category_id: string;

  @Column({ length: 20 })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Voucher, voucher => voucher.category)
  vouchers: Voucher[];

  @OneToMany(() => Transaction, transaction => transaction.category)
  transactions: Transaction[];

  @OneToMany(() => Player, player => player.favoriteCategory)
  players: Player[];
}
