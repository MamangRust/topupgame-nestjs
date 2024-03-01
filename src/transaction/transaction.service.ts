import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { History } from 'src/entities/history';
import { HistoryPayment } from 'src/entities/historyPayment';
import { HistoryPlayer } from 'src/entities/historyPlayer';
import { HistoryVcrtopup } from 'src/entities/historyVcrTopup';
import { Transaction } from 'src/entities/transaction';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
        @InjectRepository(History) private historyRepository: Repository<History>,

        @InjectEntityManager() private entityManager: EntityManager,

    ) { }

    async findAllTransaction(filter = {}, associate = true, isApi = false): Promise<Transaction[]> {
        let queryBuilder = this.transactionRepository.createQueryBuilder('transaction');

        if (associate) {
            queryBuilder = queryBuilder
                .leftJoinAndSelect('transaction.voucher', 'voucher')
                .leftJoinAndSelect('transaction.category', 'category')
                .leftJoinAndSelect('transaction.player', 'player')
                .leftJoinAndSelect('player.user', 'user')
                .leftJoinAndSelect('transaction.history', 'history')
                .leftJoinAndSelect('history.historyPlayer', 'historyPlayer')
                .leftJoinAndSelect('history.historyPayment', 'historyPayment')
                .leftJoinAndSelect('history.historyVoucherTopup', 'historyVoucherTopup');

            if (isApi) {
                queryBuilder = queryBuilder
                    .select(['transaction', 'voucher.id', 'voucher.game_name', 'voucher.game_coin_name', 'category.id', 'category.name', 'player.id', 'player.favorite', 'user.id', 'user.username', 'history.id']);
            }
        }

        try {
            const result = await queryBuilder.getMany();
            return result;
        } catch (error) {
            throw new Error("Failed to find transactions: " + error.message);
        }
    }

    async findTransactionById(id: string): Promise<Transaction> {
        try {
            const result = await this.transactionRepository.findOne({
                where: {
                    transaction_id: id
                },
                relations: [
                    'history',
                    'history.historyPlayer',
                    'history.historyPayment',
                    'history.historyVoucherTopup',
                ],
            });
            return result;
        } catch (error) {
            throw new Error("Failed to find transaction by ID: " + error.message);
        }
    }


    async createTransaction(payload: any): Promise<Transaction> {
        try {
            const {
                historyVoucherTopup,
                historyPayment,
                historyPlayer,
                ...transactionPayload
            } = payload;

            const createdTransaction = await this.entityManager.transaction(async entityManager => {

                const createdHistoryVoucherTopup = await entityManager.save(HistoryVcrtopup, historyVoucherTopup);
                const createdHistoryPayment = await entityManager.save(HistoryPayment, historyPayment);
                const createdHistoryPlayer = await entityManager.save(HistoryPlayer, historyPlayer);


                const history = await entityManager.save(History, {
                    historyVcrtopup: createdHistoryVoucherTopup,
                    historyPayment: createdHistoryPayment,
                    historyPlayer: createdHistoryPlayer,
                });


                transactionPayload.history = history;


                const createdTransaction = await entityManager.save(Transaction, transactionPayload);

                return createdTransaction;
            });

            return createdTransaction;
        } catch (error) {
            throw new Error("Failed to create transaction: " + error.message);
        }
    }

    async updateTransaction(id: string, data: any): Promise<Transaction> {
        try {
            const result = await this.transactionRepository.findOne({
                where: {
                    transaction_id: id
                }
            })

            if (!result) {
                throw new Error("failed to to get transaction not found ")
            }

            Object.assign(result, data);


            const updatedTransaction = await this.transactionRepository.save(result);

            return updatedTransaction;

        } catch (error) {
            throw new Error('failed to update transaction: ' + error.message)
        }
    }

    async deleteTransaction(id: string): Promise<Transaction> {
        try {
            const result = await this.transactionRepository.findOne({
                where: {
                    transaction_id: id
                }
            })

            if (!result) {
                throw new Error("failed to to get transaction not found ")
            }

            this.transactionRepository.remove(result)

            return result;
        } catch (error) {
            throw new Error("failed to delete transaction: " + error.message)
        }
    }
}


