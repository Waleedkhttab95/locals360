import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { UserToken, UserTokenSchema } from './entities/user.token.entity';
import { Wishlist, WishlistSchema } from './entities/user.wishlist.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: UserToken.name,
        schema: UserTokenSchema,
      },
      {
        name: Wishlist.name,
        schema: WishlistSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads', // specify the destination directory for temporary storage
    }),
    UtilitiesModule,
  ],
  exports: [
    UsersService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
