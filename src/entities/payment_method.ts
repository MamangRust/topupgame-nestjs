import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bank } from "./bank";

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Bank)
    @JoinTable({
        name: 'payment_method_bank',
        joinColumn: { name: 'payment_method_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'bank_id', referencedColumnName: 'id' },
    })
    banks: Bank[];
}
