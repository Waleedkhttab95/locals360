import { ObjectId } from "mongodb";

export class CreateTransactiondto {
  user:ObjectId;
  status: string;
  priceWithoutTax: string;
  experience: ObjectId;
  qty: number;
}
