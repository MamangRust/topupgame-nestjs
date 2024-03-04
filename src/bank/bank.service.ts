import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/entities/bank';
import { Repository } from 'typeorm';
import { UpdateBankDto } from './dto/update-bank.dto';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) { }

  async findAll(): Promise<Bank[]> {
    return this.bankRepository.find();
  }

  async findOne(id: number): Promise<Bank> {
    const bank = await this.bankRepository.findOne({
      where: {
        id: id
      }
    });
    if (!bank) {
      throw new NotFoundException('Bank not found');
    }
    return bank;
  }

  async create(createBankDto: CreateBankDto): Promise<Bank> {
    const { name } = createBankDto;
    const existingBank = await this.bankRepository.findOne({ where: { name } });
    if (existingBank) {
      throw new BadRequestException('Bank name already exists');
    }
    return this.bankRepository.save(createBankDto);
  }

  async update(id: number, updateBankDto: UpdateBankDto): Promise<Bank> {
    const bank = await this.findOne(id);
    return this.bankRepository.save({ ...bank, ...updateBankDto });
  }

  async remove(id: number): Promise<void> {
    const bank = await this.findOne(id);
    await this.bankRepository.remove(bank);
  }
}