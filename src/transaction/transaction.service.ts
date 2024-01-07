import { Injectable } from '@nestjs/common';
import { CreateTransactiondto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entity';
import { Model } from 'mongoose';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Injectable()
export class TransactionService {

    constructor(
    @InjectModel(Transaction.name)
    private readonly transactionRepository: Model<Transaction>,
    private utilitiesService : UtilitiesService
    ){}

    async create(createTransactionDto : CreateTransactiondto){
        const priceWithTax = this.utilitiesService.calculateTax(createTransactionDto.priceWithoutTax)
        const tax = this.utilitiesService.getPercentageOfTax()

        createTransactionDto['priceWithTax'] = priceWithTax
        createTransactionDto['tax'] = tax
        createTransactionDto['totalWithTax'] = priceWithTax * createTransactionDto.qty

        const transaction = await this.transactionRepository.create(createTransactionDto)

        await transaction.save()

        return transaction;
    }
}
