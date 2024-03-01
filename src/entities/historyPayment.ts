import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { History } from "./history";


@Entity()
export class HistoryPayment {
  @PrimaryColumn({ length: 25 })
  history_payment_id: string;

  @Column('text')
  payer: string;

  @Column({ length: 45 })
  type: string;

  @Column({ length: 30 })
  bank_account_name: string;

  @Column({ length: 25 })
  bank_name: string;

  @Column({ length: 20 })
  no_rekening: string;

  @OneToMany(() => History, history => history.historyPayment)
  histories: History[];
}
