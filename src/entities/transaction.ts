import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Category } from './category';
import { Nominal } from './nominal';
import { Bank } from './bank';
import { Member } from './member';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    voucherName: string;

    @Column()
    imageName: string;

    @ManyToOne(() => Category, category => category.transactions)
    category: Category;

    @ManyToOne(() => Nominal, nominal => nominal.transactions)
    nominal: Nominal;

    @Column()
    paymentMethod: string;

    @ManyToOne(() => Bank, bank => bank.transactions)
    targetBank: Bank;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    taxRate: number;

    @ManyToOne(() => Member, member => member.transactions)
    member: Member;

    @Column({ default: 'paying' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    getTotalPrice(): number {
        const subTotal = this.nominal.price;
        const totalPrice = subTotal * this.taxRate + subTotal;
        return totalPrice;
    }
}
