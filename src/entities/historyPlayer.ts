import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { History } from "./history";


@Entity()
export class HistoryPlayer {
    @PrimaryColumn({ length: 25 })
    historyPlayerId: string;

    @Column({ name: 'name', type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ name: 'email', type: 'varchar', length: 128, nullable: false })
    email: string;

    @Column({ name: 'phone_number', type: 'varchar', length: 20, nullable: false })
    phoneNumber: string;

    @OneToOne(() => History, history => history.historyPlayer)
    history: History;
}