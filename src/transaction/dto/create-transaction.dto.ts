import { ObjectId } from "mongodb";

export class CreateTransactiondto {
  user:ObjectId;
  status: string;
  priceWithoutTax: number;
  experience: ObjectId;
  qty: number;
}
