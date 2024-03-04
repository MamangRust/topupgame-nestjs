import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "./payment_method";
import { Transaction } from "./transaction";



@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  holderName: string;

  @Column()
  holderNumbers: string;

  @ManyToMany(() => PaymentMethod)
  @JoinTable({
    name: 'payment_method_bank',
    joinColumn: { name: 'bank_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'payment_method_id', referencedColumnName: 'id' },
  })
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Transaction, transaction => transaction.targetBank)
  transactions: Transaction[];
}