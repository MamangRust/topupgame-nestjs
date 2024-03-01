import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { PaymentBank } from "./paymentBank";
import { PaymentMethod } from "./paymentmethod";


@Entity()
export class Bank {
  @PrimaryColumn({ length: 15 })
  bank_id: string;

  @Column({ length: 25 })
  account_name: string;

  @Column({ length: 25 })
  bank_name: string;

  @Column({ length: 20 })
  no_rekening: string;

  @OneToMany(() => PaymentBank, paymentBank => paymentBank.bank)
  paymentBanks: PaymentBank[];

  @ManyToMany(() => PaymentMethod, paymentMethod => paymentMethod.banks)
  payment_methods: PaymentMethod[];
}
