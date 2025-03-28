import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extractFilePathFromUrl } from 'src/common/common.use.helper';
import { AccountDto } from 'src/dto/account.dto';
import { FilterAccountsDto } from 'src/dto/common.filter.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';
import * as admin from 'firebase-admin';
import { DeleteResult, Repository } from 'typeorm';
import { filterGetAccounts } from 'src/repositories/accounts.repository';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(query: FilterAccountsDto): Promise<any> {
    const repository = this.accountRepository;
    return filterGetAccounts({
      query,
      repository,
    });
  }

  async findOne(accountId: number): Promise<AccountEntity> {
    return await this.accountRepository.findOne({
      where: { accountId },
      relations: ['user', 'role'],
      select: {
        accountId: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        avatar: true,
        user: {
          userId: true,
          fullName: true,
        },
        role: {
          roleId: true,
          roleName: true,
        },
      },
    });
  }

  async create(
    userId: number,
    roleId: string,
    accountDto: AccountDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ userId });
    const role = await this.roleRepository.findOneBy({ roleId });
    try {
      const account = await this.accountRepository.create({
        ...accountDto,
        user,
        role,
      });
      const res = await this.accountRepository.save(account);

      return await this.accountRepository.findOne({
        where: { accountId: res.accountId },
        relations: ['user', 'role'],
        select: {
          // accountId: true,
          // createdAt: true,
          // updatedAt: true,
          user: {
            userId: true,
            fullName: true,
          },
          role: {
            roleId: true,
            roleName: true,
          },
        },
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }
  //can module lai
  private bucket = admin.storage().bucket();

  async update(accountId: number, accountDto: AccountDto): Promise<any> {
    const { avatar, ...account } = accountDto;
    if (avatar) {
      const accountUpdate = await this.accountRepository.findOne({
        where: {
          accountId,
        },
      });

      const filePath = extractFilePathFromUrl(accountUpdate.avatar);
      if (filePath) {
        await this.bucket.file(filePath).delete();
      }
      try {
        console.log(`File ${filePath} deleted successfully.`);
      } catch (error) {
        console.error(`Failed to delete file ${filePath}:`, error);
        throw new Error(`Could not delete file ${filePath}.`);
      }
    }
    return await this.accountRepository.update(accountId, accountDto);
  }

  async delete(accountId: number): Promise<DeleteResult> {
    const accountDelete = await this.accountRepository.findOne({
      where: {
        accountId,
      },
    });
    if (accountDelete.avatar) {
      const filePath = extractFilePathFromUrl(accountDelete.avatar);
      try {
        if (filePath) {
          await this.bucket.file(filePath).delete();
        }
        console.log(`File ${filePath} deleted successfully.`);
      } catch (error) {
        console.error(`Failed to delete file ${filePath}:`, error);
        throw new Error(`Could not delete file ${filePath}.`);
      }
    }
    return await this.accountRepository.delete(accountId);
  }
}
