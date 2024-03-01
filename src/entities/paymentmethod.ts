import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Transaction } from "./transaction";
import { PaymentBank } from "./paymentBank";
import { Bank } from "./bank";


@Entity()
export class PaymentMethod {
  @PrimaryColumn({ length: 15 })
  payment_method_id: string;

  @Column({ length: 15 })
  type: string;

  @Column({ length: 1, default: 'Y' })
  status: string;

  @OneToMany(() => Transaction, transaction => transaction.paymentMethod)
  transactions: Transaction[];

  @OneToMany(() => PaymentBank, paymentBank => paymentBank.paymentMethod)
  paymentBanks: PaymentBank[];

  @ManyToMany(() => Bank, bank => bank.payment_methods)
  banks: Bank[];
}
