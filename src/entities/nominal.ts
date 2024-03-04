import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from './transaction';

@Entity()
export class Nominal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;


    @OneToMany(() => Transaction, transaction => transaction.nominal) // One-to-Many relation with Transaction
    transactions: Transaction[]; // Define transactions property
}