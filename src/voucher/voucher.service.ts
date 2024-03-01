import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Nominal } from 'src/entities/nominal';
import { Voucher } from 'src/entities/voucher';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class VoucherService {
    constructor(
        @InjectRepository(Voucher) private voucherRepository: Repository<Voucher>,
        @InjectEntityManager() private entityManager: EntityManager
    ) { }

    async findAll(filter: any = { where: {}, order: { game_name: 'ASC' } }): Promise<Voucher[]> {
        try {
            const result = this.voucherRepository.find({
                where: filter.where,
                order: filter.order,
                relations: ['category', "nominals"]
            })



            return result;
        } catch (error) {
            throw new Error("failed to get vouchers: " + error)
        }
    }

    async findByIds(id: string): Promise<Voucher[]> {
        try {
            const result = this.voucherRepository.find({
                where: {
                    voucher_id: id
                }
            })

            return result
        } catch (error) {
            throw new Error("Failed to find voucher by ID")
        }
    }

    async findById(id: string): Promise<Voucher> {
        try {
            const result = this.voucherRepository.findOne({
                where: {
                    voucher_id: id
                }
            })

            return result
        } catch (error) {
            throw new Error("failed to find voucher by id")
        }
    }

    async createVoucher(voucherData: any, nominalData: any[]): Promise<Voucher> {
        try {
            const queryRunner = await this.entityManager.transaction(async entityManager => {
                const createdVoucher = await queryRunner.save(Voucher, voucherData);

                for (const nominal of nominalData) {
                    const createdNominal = await queryRunner.save(Nominal, nominal);

                    await queryRunner.query(
                        `INSERT INTO voucher_nominal(voucher_id, nominal_id, self_granted) VALUES ($1, $2, $3)`,
                        [createdVoucher.voucher_id, createdNominal.nominal_id, true],
                    );
                }

                await queryRunner.commitTransaction();
                return createdVoucher;

            })

            return queryRunner
        } catch (error) {

            throw new Error("Failed to create voucher");
        }
    }

    async updateVoucher(id: string, data: any): Promise<Voucher> {
        const { nominals, name, gameCoinName, category, fileimg } = data;

        try {
            const queryRunner = this.entityManager.transaction(async entityManager => {

                const voucher = await entityManager.findOne(Voucher, {
                    where: {
                        voucher_id: id,
                    },
                    relations: ['nominals'],
                });

                if (!voucher) {
                    throw new NotFoundException('Voucher not found');
                }

                voucher.game_name = name;
                voucher.category = category;
                voucher.game_coin_name = gameCoinName;


                await entityManager.query(
                    `DELETE FROM voucher_nominal WHERE voucher_id = $1`,
                    [id],
                );

                if (nominals && nominals.length > 0) {
                    const newNominals = await this.entityManager.find(Nominal, {
                        where: {
                            nominal_id: nominals.id
                        }
                    });
                    voucher.nominals = newNominals;
                }

                const updatedVoucher = await queryRunner.save(voucher);

                await queryRunner.commitTransaction();


                return updatedVoucher;
            })



            return queryRunner
        } catch (error) {

            throw new Error("Failed to update voucher");
        }
    }

    async deleteVoucher(id: string): Promise<Voucher> {
        try {
            const result = this.voucherRepository.findOne({
                where: {
                    voucher_id: id
                }
            })

            return result
        } catch (error) {
            throw new Error("failed to delete voucher: " + error)
        }
    }

}
