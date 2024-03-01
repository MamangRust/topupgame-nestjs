import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nominal } from 'src/entities/nominal';
import { Repository } from 'typeorm';

@Injectable()
export class NominalService {
  constructor(@InjectRepository(Nominal) private nominalRepository: Repository<Nominal>) { }

  async findAll(): Promise<Nominal[]> {
    try {
      const result = this.nominalRepository.find({
        take: 10
      })

      return result
    } catch (error) {
      throw new Error("failed to get nominals " + error)
    }
  }

  async findId(id: string): Promise<Nominal> {
    try {
      const result = this.nominalRepository.findOne({
        where: {
          nominal_id: id
        }
      })

      return result
    } catch (error) {
      throw new Error('failed to get nominal ' + error)
    }
  }

  async create(coin_name: string, coin_quantity: number, price: number, description: string): Promise<Nominal> {
    try {
      const result = await this.nominalRepository.findOne({
        where: {
          coin_name: coin_name
        }
      });

      if (result) {
        throw new Error("Nominal with the provided coin name already exists.");
      }

      const newNominal = this.nominalRepository.create({
        coin_name: coin_name,
        coin_quantity: coin_quantity,
        price: price,
        description: description,
      })

      this.nominalRepository.save(newNominal)

      return newNominal

    } catch (error) {
      throw new Error("failed to create nominal " + error)
    }
  }

  async update(id: string, coin_name: string, coin_quantity: number, price: number, description: string) {
    try {
      const result = await this.nominalRepository.findOne({
        where: {
          nominal_id: id
        }
      });

      if (!result) {
        throw new Error("Nominal with the provided ID does not exist.");
      }

      result.coin_name = coin_name
      result.coin_quantity = coin_quantity
      result.price = price
      result.description = description

      this.nominalRepository.save(result)

      return result

    } catch (error) {
      throw new Error("failed to update nominal " + error)
    }
  }

  async delete(id: string): Promise<Nominal> {
    try {
      const result = await this.nominalRepository.findOne({
        where: {
          nominal_id: id
        }
      })

      if (!result) {
        throw new Error("Nominal with the provided ID already exists.");

      }

      this.nominalRepository.remove(result)

      return result
    } catch (error) {
      throw new Error('failed to delete nominal: ' + error)
    }
  }
}
