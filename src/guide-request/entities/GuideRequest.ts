import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Guide } from "src/guide/entities/guide.entity";

export enum GuideRequestStatus {
    PENDING = 'PENDING',
    UNDER_PROCCESS = 'UNDER_PROCCESS',
    APPROVE = 'APPROVE',
    REJECT = 'REJECT',
  }

  export type GuideRequestDocument = HydratedDocument<GuideRequest>;


@Schema({
      timestamps: true,
    })
export class GuideRequest {

    @Prop({ type:mongoose.Schema.Types.ObjectId, ref: 'Guide' })
    guide: Guide;

    @Prop()
    description: string;

    @Prop()
    requestDate: Date;

    @Prop()
    status: GuideRequestStatus;
}

export const GuideRequestSchema = SchemaFactory.createForClass(GuideRequest);