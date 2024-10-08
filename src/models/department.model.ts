export class Department {
  departmentId?: string;
  departmentName?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ departmentId, departmentName, createdAt, updatedAt }) {
    if (departmentId !== null) this.departmentId = departmentId;
    if (departmentName !== null) this.departmentName = departmentName;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
