import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Nominal } from "./nominal";


@Entity()
export class Voucher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imageName: string;

    @ManyToOne(() => Category, category => category.vouchers)
    category: Category;

    @ManyToMany(() => Nominal)
    @JoinTable()
    nominals: Nominal[];
}