export class Account {
  accountId?: number;
  email?: string;
  password?: string;
  roleId?: string;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    accountId,
    email,
    password,
    roleId,
    userId,
    createdAt,
    updatedAt,
  }) {
    if (accountId !== null) this.accountId = accountId;
    if (email !== null) this.email = email;
    if (password !== null) this.password = password;
    if (roleId !== null) this.roleId = roleId;
    if (userId !== null) this.userId = userId;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
