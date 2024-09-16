export class Role {
  roleId?: string;
  roleName?: string;

  constructor({ roleId, roleName }) {
    if (roleId !== null) this.roleId = roleId;
    if (roleName !== null) this.roleName = roleName;
  }
}
