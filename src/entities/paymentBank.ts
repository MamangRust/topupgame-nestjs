import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { PaymentMethod } from "./paymentmethod";
import { Bank } from "./bank";

@Entity()
export class PaymentBank {
  @PrimaryColumn({ length: 15 })
  payment_bank_id: string;

  @Column({ length: 15 })
  bank_id: string;

  @Column({ length: 15 })
  payment_method_id: string;

  @Column()
  self_granted: boolean;

  @ManyToOne(() => Bank, bank => bank.paymentBanks)
  bank: Bank;

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.paymentBanks)
  paymentMethod: PaymentMethod;
}
