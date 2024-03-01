import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Voucher } from "./voucher";
import { Category } from "./category";
import { Player } from "./player";
import { History } from "./history";
import { PaymentMethod } from "./paymentmethod";


@Entity()
export class Transaction {
  @PrimaryColumn({ length: 30 })
  transaction_id: string;

  @Column({ length: 25 })
  name: string;

  @Column({ length: 128 })
  account_game: string;

  @Column({ default: 0 })
  tax: number;

  @Column()
  value: number;

  @Column({ length: 8 })
  status: string

  @Column()
  is_paid: boolean;

  @ManyToOne(() => History, history => history.transactions)
  history: History;

  @ManyToOne(() => Voucher, voucher => voucher.transactions)
  voucher: Voucher;

  @ManyToOne(() => Category, category => category.transactions)
  category: Category;

  @ManyToOne(() => Player, player => player.transactions)
  player: Player;

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.transactions)
  paymentMethod: PaymentMethod

}
