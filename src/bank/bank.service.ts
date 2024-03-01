import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/entities/bank';
import { Repository } from 'typeorm';

@Injectable()
export class BankService {
  constructor(@InjectRepository(Bank) private bankRepository: Repository<Bank>) { }

  async findAll(): Promise<Bank[]> {
    try {
      const result = await this.bankRepository.find({
        take: 10
      })

      return result
    } catch (error) {
      throw new Error("failed to find all bank " + error)
    }
  }

  async findId(id: string): Promise<Bank> {
    try {
      const result = await this.bankRepository.findOne({
        where: {
          bank_id: id
        }
      })

      return result
    } catch (error) {
      throw new Error("failed to find id bank: " + error)
    }
  }

  async create(account_name: string, bank_name: string, no_rekening: string): Promise<Bank> {
    try {
      const resultName = await this.bankRepository.findOne({
        where: {
          bank_name: bank_name
        }
      })

      if (resultName) {
        throw new Error("Bank with the provided name already exists.");
      }

      const newBank = this.bankRepository.create({
        account_name: account_name,
        bank_name: bank_name,
        no_rekening: no_rekening,
      })

      const result = await this.bankRepository.save(newBank)

      return result;
    } catch (error) {
      throw new Error("failed to create bank: " + error)
    }
  }

  async update(bank_id: string, account_name: string, bank_name: string, no_rekening: string): Promise<Bank> {
    try {
      const result = await this.bankRepository.findOne({
        where: {
          bank_id: bank_id
        }
      })

      if (!result) {
        throw new Error("Bank with the provided ID does not exist.");
      }

      result.account_name = account_name
      result.bank_name = bank_name
      result.no_rekening = no_rekening

      this.bankRepository.save(result)

      return result

    } catch (error) {
      throw new Error("failed to update bank: " + error)
    }
  }

  async delete(id: string): Promise<Bank> {
    try {
      const result = await this.bankRepository.findOne({
        where: {
          bank_id: id
        }
      })

      this.bankRepository.remove(result)

      return result
    } catch (error) {
      throw new Error("failed to delete id bank:" + error)
    }
  }
}
