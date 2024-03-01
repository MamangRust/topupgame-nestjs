import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user";
import { Voucher } from "./voucher";


@Entity()
export class Administrator {
  @PrimaryColumn({ length: 25 })
  admin_id: string;

  @Column({ length: 25, nullable: true })
  user_id: string;

  @Column('text', { nullable: true })
  address: string;

  @ManyToOne(() => User, user => user.administrator)
  user: User;

  @OneToMany(() => Voucher, voucher => voucher.admin)
  vouchers: Voucher[];
}
