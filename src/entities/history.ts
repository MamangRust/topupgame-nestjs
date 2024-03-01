import { Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Player } from "./player";
import { Transaction } from "./transaction";
import { HistoryPayment } from "./historyPayment";
import { HistoryVcrtopup } from "./historyVcrTopup";
import { HistoryPlayer } from "./historyPlayer";


@Entity()
export class History {
  @PrimaryColumn({ length: 25 })
  history_id: string;

  @ManyToOne(() => HistoryVcrtopup, historyVcrtopup => historyVcrtopup.histories)
  historyVcrtopup: HistoryVcrtopup;

  @ManyToOne(() => HistoryPayment, historyPayment => historyPayment.histories)
  historyPayment: HistoryPayment;


  @OneToMany(() => Transaction, transaction => transaction.history)
  transactions: Transaction[];

  @OneToOne(() => HistoryPlayer, historyPlayer => historyPlayer.history)
  historyPlayer: HistoryPlayer;
}
