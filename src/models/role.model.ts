export class Role {
  roleId?: string;
  roleName?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ roleId, roleName, createdAt, updatedAt }) {
    if (roleId !== null) this.roleId = roleId;
    if (roleName !== null) this.roleName = roleName;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
