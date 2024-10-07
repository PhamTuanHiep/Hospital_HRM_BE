import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations, Select } from 'src/common/common.type';
import {
  extractFilePathFromUrl,
  filterGetAll,
} from 'src/common/common.use.helper';
import { AccountDto } from 'src/dto/account.dto';
import { FilterDto } from 'src/dto/common.filter.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';
import * as admin from 'firebase-admin';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

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

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.accountRepository;
    const relations: Relations<string> = {
      user: true,
      role: true,
      createdBy: true,
      updatedBy: true,
    };
    const select: Select<string> = {
      user: {
        userId: true,
        fullName: true,
      },
      role: {
        roleId: true,
        roleName: true,
      },
      createdBy: {
        userId: true,
        fullName: true,
      },
      updatedBy: {
        userId: true,
        fullName: true,
      },
    };
    const arrSearch: string[] = ['email'];

    return filterGetAll({ query, repository, relations, select, arrSearch });
  }

  async findOne(accountId: number): Promise<AccountEntity | null> {
    // return await this.accountRepository.findOne({ where: { accountId } });
    return await this.accountRepository.findOne({
      where: { accountId },
      relations: ['user', 'role', 'createdBy', 'updatedBy'],
      select: {
        user: {
          userId: true,
          fullName: true,
        },
        role: {
          roleId: true,
          roleName: true,
        },
        createdBy: {
          userId: true,
          fullName: true,
        },
        updatedBy: {
          userId: true,
          fullName: true,
        },
      },
    });
  }

  async create(
    userId: number,
    roleId: string,
    createdById: number,
    updatedById: number,
    accountDto: AccountDto,
  ): Promise<AccountEntity> {
    const user = await this.userRepository.findOneBy({ userId });
    const role = await this.roleRepository.findOneBy({ roleId });
    const createdBy =
      (await this.userRepository.findOneBy({ userId: createdById })) || null;
    const updatedBy =
      (await this.userRepository.findOneBy({ userId: updatedById })) || null;

    console.log('-user:', user);
    console.log('-role:', role);
    console.log('-createdBy:', createdBy);
    console.log('-updatedBy:', updatedBy);
    try {
      const res = await this.accountRepository.save({
        ...accountDto,
        user: user,
        role: role,
        createdBy: createdBy,
        updatedBy: updatedBy,
      });
      console.log('-res:', res);

      return await this.accountRepository.findOne({
        where: { accountId: res.accountId },
        relations: ['user', 'role', 'createdBy', 'updatedBy'],
        select: {
          user: {
            userId: true,
            fullName: true,
          },
          role: {
            roleId: true,
            roleName: true,
          },
          createdBy: {
            userId: true,
            fullName: true,
          },
          updatedBy: {
            userId: true,
            fullName: true,
          },
        },
      });
    } catch (error) {
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }
  private bucket = admin.storage().bucket();
  async update(
    accountId: number,
    accountDto: AccountDto,
  ): Promise<UpdateResult> {
    return await this.accountRepository.update(accountId, accountDto);
  }

  async delete(accountId: number): Promise<DeleteResult> {
    const accountDelete = await this.accountRepository.findOne({
      where: {
        accountId,
      },
    });
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
    return await this.accountRepository.delete(accountId);
  }
}
