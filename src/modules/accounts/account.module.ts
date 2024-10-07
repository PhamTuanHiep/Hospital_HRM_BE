import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { AccountControllers } from './account.controller';
import { AccountService } from './account.service';
import { UserEntity } from 'src/entities/user.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { FirebaseModule } from '../firebase/firebase.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, UserEntity, RoleEntity]),
    ImageModule,
    FirebaseModule,
  ],
  controllers: [AccountControllers],
  providers: [AccountService],
})
export class AccountModule {}
