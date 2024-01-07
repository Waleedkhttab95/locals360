import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Guide } from './guide.entity';

@Schema({
  timestamps: true,
})
export class GuideToken {
  @Prop()
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Guide' })
  guide: Guide;
}

export const GuideTokenSchema = SchemaFactory.createForClass(GuideToken);
