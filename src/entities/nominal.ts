import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { VoucherNominal } from "./voucherNominal";
import { Voucher } from "./voucher";


@Entity()
export class Nominal {
  @PrimaryColumn({ length: 25 })
  nominal_id: string;

  @Column()
  coin_quantity: number;

  @Column()
  coin_name: string;

  @Column({ default: 0 })
  price: number;

  @Column()
  description: string;

  @OneToMany(() => VoucherNominal, voucherNominal => voucherNominal.nominal)
  voucherNominals: VoucherNominal[];

  @ManyToMany(() => Voucher, voucher => voucher.nominals)
  @JoinTable()
  vouchers: Voucher[];
}
