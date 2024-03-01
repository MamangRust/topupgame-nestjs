import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Nominal } from "./nominal";
import { Voucher } from "./voucher";

@Entity()
export class VoucherNominal {
  @PrimaryColumn({ length: 25 })
  voucher_nominal_id: string;

  @Column()
  self_granted: boolean;

  @ManyToOne(() => Nominal, nominal => nominal.voucherNominals)
  nominal: Nominal;

  @ManyToOne(() => Voucher, voucher => voucher.voucherNominals)
  voucher: Voucher;
}
