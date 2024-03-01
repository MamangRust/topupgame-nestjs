import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { History } from "./history";


@Entity()
export class HistoryVcrtopup {
  @PrimaryColumn({ length: 25 })
  history_vcrtopup_id: string;

  @Column({ length: 128 })
  game_name: string;

  @Column({ length: 45 })
  coin_name: string;

  @Column({ length: 20, nullable: true })
  category: string;

  @Column()
  coin_quantity: number;

  @Column({ default: 0 })
  price: number;

  @Column()
  thumbnail: string;

  @OneToMany(() => History, history => history.historyVcrtopup)
  histories: History[];
}
