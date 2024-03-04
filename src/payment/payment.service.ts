import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { Bank } from 'src/entities/bank';
import { PaymentMethod } from 'src/entities/payment_method';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) { }



  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find({
      relations: ['banks']
    })
  }


  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.createQueryBuilder('pm')
      .leftJoinAndSelect('pm.banks', 'bank')
      .getMany();
  }


  async findOne(id: number): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: {
        id
      },
      relations: ['banks'],
    });
    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }
    return paymentMethod;
  }

  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
    const banks = await this.bankRepository.find({
      where: {
        id: In(createPaymentMethodDto.bankIds)
      }
    });


    if (!banks || banks.length === 0) {
      throw new NotFoundException('Banks not found');
    }

    const paymentMethod = this.paymentMethodRepository.create({
      name: createPaymentMethodDto.name,
      banks,
    });

    return this.paymentMethodRepository.save(paymentMethod);
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
    const paymentMethod = await this.findOne(id);
    const banks = await this.bankRepository.find({
      where: {
        id: In(updatePaymentMethodDto.bankIds)
      }
    });
    paymentMethod.name = updatePaymentMethodDto.name;
    paymentMethod.banks = banks;
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async remove(id: number): Promise<void> {
    const paymentMethod = await this.findOne(id);
    await this.paymentMethodRepository.remove(paymentMethod);
  }
}
