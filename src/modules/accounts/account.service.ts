import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/dto/account.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { Account } from 'src/models/account.model';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async findAll() {
    return await this.accountRepository.find();
  }

  async findOne(accountId: number): Promise<Account | null> {
    return await this.accountRepository.findOne({ where: { accountId } });
  }

  async createUser(accountDto: AccountDto) {
    const account = this.accountRepository.create(accountDto);
    console.log('accountDto:', accountDto);
    console.log('account:', account);
    //save entity
    let res = await this.accountRepository.save(account);
    console.log('res:', res);

    return res;
  }

  async update(accountId: number, accountDto: AccountDto) {
    const account = await this.accountRepository.findOne({
      where: { accountId },
    });
    const accountUpdate = {
      ...account,
      ...accountDto,
    };
    return await this.accountRepository.save(accountUpdate);
  }

  async delete(accountId: number) {
    const user = await this.accountRepository.findOne({ where: { accountId } });
    return await this.accountRepository.remove(user);
  }
}
