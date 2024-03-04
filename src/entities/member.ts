import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Category } from './category';
import { Transaction } from './transaction';


@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Category, category => category.members)
    favoriteCategory: Category;

    @Column({ nullable: true })
    avatarName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @OneToMany(() => Transaction, transaction => transaction.member)
    transactions: Transaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}