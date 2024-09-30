export class Role {
  roleId?: string;
  roleName?: string;
  createdById?: number;
  updatedById?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    roleId,
    roleName,
    createdById,
    updatedById,
    createdAt,
    updatedAt,
  }) {
    if (roleId !== null) this.roleId = roleId;
    if (roleName !== null) this.roleName = roleName;
    if (createdById !== null) this.createdById = createdById;
    if (updatedById !== null) this.updatedById = updatedById;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
