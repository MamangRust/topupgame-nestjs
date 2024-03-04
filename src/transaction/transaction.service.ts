import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/entities/bank';
import { Member } from 'src/entities/member';
import { Nominal } from 'src/entities/nominal';
import { PaymentMethod } from 'src/entities/payment_method';
import { Transaction } from 'src/entities/transaction';
import { Voucher } from 'src/entities/voucher';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>,
    @InjectRepository(Nominal)
    private nominalRepository: Repository<Nominal>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) { }

  async getTransactions(userId: string, status?: Transaction['status']): Promise<{ transactions: Transaction[], totalSpent: number }> {
    try {
      const queryBuilder = this.transactionRepository.createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.nominal', 'nominal')
        .where('transaction.member = :userId', { userId });

      if (status) {
        queryBuilder.andWhere('transaction.status = :status', { status });
      }

      const [totalSpentResult, transactions] = await Promise.all([
        queryBuilder
          .select('SUM(nominal.price * (1 + transaction.taxRate))', 'totalSpent')
          .getRawOne(),
        queryBuilder
          .select(['transaction', 'nominal'])
          .getMany(),
      ]);

      const totalSpent = totalSpentResult ? totalSpentResult.totalSpent : 0;

      return { transactions, totalSpent };
    } catch (error) {
      throw new NotFoundException('Transactions not found');
    }
  }

  async getTransaction(id: number, userId: number): Promise<Transaction> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: {
          id,
          member: { id: userId }
        },
        relations: ['nominal']
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      return transaction;
    } catch (error) {
      throw new NotFoundException('Transaction not found');
    }
  }

  async addTransaction(body: CreateTransactionDto, userId: number): Promise<Transaction> {
    try {
      const [voucher, nominal, paymentMethod, bank] = await Promise.all([
        this.voucherRepository.findOneOrFail({
          where: {
            id: body.voucherId
          }, relations: ['category']
        }),
        this.nominalRepository.findOneOrFail({
          where: {
            id: body.nominalId
          }
        }),
        this.paymentMethodRepository.findOneOrFail({
          where: {
            id: body.paymentMethodId
          }
        }),
        this.bankRepository.findOneOrFail({
          where: {
            id: body.bankId
          }
        }),
      ]);

      const member = await this.memberRepository.findOneOrFail({
        where: {
          id: userId
        }
      });

      const transaction = this.transactionRepository.create({
        voucherName: voucher.name,
        imageName: voucher.imageName,
        category: voucher.category,
        nominal: nominal,
        paymentMethod: paymentMethod.name,
        targetBank: bank,
        taxRate: 10 / 100,
        member: member
      });

      await this.transactionRepository.save(transaction);

      return transaction;
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException('One or more referenced entities not found');
      } else {
        throw new BadRequestException('Failed to create transaction' + error);
      }
    }
  }

  async confirmPayment(id: number): Promise<{ message: string }> {
    try {
      const transaction = await this.transactionRepository.findOneOrFail({
        where: {
          id: id
        }
      });

      if (transaction.status !== 'paying') {
        throw new ForbiddenException('Unable to confirm this payment. Payment for this transaction has already been confirmed.');
      }

      transaction.status = 'verifying';
      await this.transactionRepository.save(transaction);

      return { message: 'Payment has been confirmed. Please wait for admin verification.' };
    } catch (error) {
      throw new NotFoundException('Transaction not found');
    }
  }

  // ini


  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async acceptTransaction(id: number): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { id, status: 'verifying' },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found or cannot be accepted');
    }
    transaction.status = 'accepted';
    await this.transactionRepository.save(transaction);
  }

  async rejectTransaction(id: number): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { id, status: 'verifying' },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found or cannot be rejected');
    }
    transaction.status = 'rejected';
    await this.transactionRepository.save(transaction);
  }
}
