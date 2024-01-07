import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { UtilitiesModule } from 'src/utilities/utilities.module';

@Module({
  providers: [TransactionService],
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    UtilitiesModule,
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
