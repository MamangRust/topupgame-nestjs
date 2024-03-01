import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/entities/bank';
import { PaymentMethod } from 'src/entities/paymentmethod';
import { EntityManager, In, Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(PaymentMethod) private paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
    @InjectEntityManager() private entityManager: EntityManager
  ) {

  }

  async findAll(): Promise<PaymentMethod[]> {
    try {
      const result = await this.paymentMethodRepository
        .createQueryBuilder("PaymentMethod")
        .leftJoinAndSelect("PaymentMethod.banks", "bank")
        .select([
          "PaymentMethod.payment_method_id",
          "PaymentMethod.type",
          "PaymentMethod.status",
          "bank.bank_id",
          "bank.account_name",
          "bank.bank_name",
          "bank.no_rekening"
        ])
        .getMany();
      return result;
    } catch (error) {
      throw new Error("failed to get payments " + error)
    }
  }

  async findId(id: string): Promise<PaymentMethod> {
    const result = await this.paymentMethodRepository
      .createQueryBuilder("paymentMethod")
      .leftJoinAndSelect("paymentMethod.banks", "bank")
      .where("paymentMethod.payment_method_id = :id", { id })
      .select([
        "paymentMethod.payment_method_id",
        "paymentMethod.type",
        "paymentMethod.status",
        "bank.bank_id",
        "bank.account_name",
        "bank.bank_name",
        "bank.no_rekening"
      ])
      .getOne();
    return result;
  }

  async createPayment(data: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const entityManager = this.paymentMethodRepository.manager;
    const queryRunner = entityManager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const paymentMethod = await this.paymentMethodRepository.save(data);
      const bank = await this.bankRepository.find();

      if (!bank) {
        throw new Error('Bank not found');
      }

      paymentMethod.banks = [...bank];

      await this.paymentMethodRepository.save(paymentMethod);

      await queryRunner.commitTransaction();

      return paymentMethod;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updatePayment(id: string, data: any): Promise<PaymentMethod> {
    const { type, newBanks, oldBanks } = data;

    try {
      const queryRunner = this.entityManager.transaction(async entityManager => {
        const paymentMethod = await entityManager.findOne(PaymentMethod, {
          where: {
            payment_method_id: id
          },
          relations: ['banks'],
        });
        if (!paymentMethod) {
          throw new Error('Payment method not found');
        }

        paymentMethod.type = type;

        if (oldBanks && oldBanks.length !== 0) {
          for (const ob of oldBanks) {
            const oldBank = await entityManager.findOne(Bank, { where: { bank_id: ob.bankId } });
            if (oldBank) {
              await entityManager.remove(Bank, oldBank);
            }
          }
        }

        if (newBanks && newBanks.length !== 0) {
          for (const nb of newBanks) {
            const newBank = await entityManager.findOne(Bank, { where: { bank_id: nb.bankId } });
            if (newBank) {
              paymentMethod.banks.push(newBank);
            }
          }
        }

        const result = await entityManager.save(PaymentMethod, paymentMethod);

        return result
      });


      return queryRunner;
    } catch (error) {
      throw new Error("failed to update payment");
    }
  }

  async deletePayment(id: string): Promise<PaymentMethod> {
    try {
      const result = await this.paymentMethodRepository.findOne({
        where: {
          payment_method_id: id
        }
      })

      if (!result) {
        throw new Error("failed to no found id payment ")
      }

      this.paymentMethodRepository.remove(result)


      return result
    } catch (error) {
      throw new Error("failed to delete payment method: " + error.message);
    }
  }
}
