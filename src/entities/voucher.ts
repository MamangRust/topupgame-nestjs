import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Administrator } from "./admin";
import { Category } from "./category";
import { Transaction } from "./transaction";
import { VoucherNominal } from "./voucherNominal";
import { Nominal } from "./nominal";


@Entity()
export class Voucher {
  @PrimaryColumn({ length: 25 })
  voucher_id: string;

  @Column({ length: 25 })
  admin_id: string;

  @Column({ length: 128 })
  game_name: string;

  @Column({
    length: 15
  })
  game_coin_name: string;

  @Column({ length: 1, default: 'Y' })
  status: string;

  @Column()
  thumbnail: string;

  @ManyToOne(() => Administrator, administrator => administrator.vouchers)
  admin: Administrator;

  @ManyToOne(() => Category, category => category.vouchers)
  category: Category;

  @OneToMany(() => Transaction, transaction => transaction.voucher)
  transactions: Transaction[];

  @OneToMany(() => VoucherNominal, voucherNominal => voucherNominal.voucher)
  voucherNominals: VoucherNominal[];

  @ManyToMany(() => Nominal, nominal => nominal.vouchers)
  nominals: Nominal[];
}
