import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Voucher } from "./voucher";
import { Member } from "./member";
import { Transaction } from "./transaction";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Voucher, voucher => voucher.category)
    vouchers: Voucher[];

    @OneToMany(() => Member, member => member.favoriteCategory)
    members: Member[];

    @OneToMany(() => Transaction, transaction => transaction.member)
    transactions: Transaction[];

}