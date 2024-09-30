export class Department {
  departmentId?: string;
  departmentName?: string;
  createdById?: number;
  updatedById?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    departmentId,
    departmentName,
    createdById,
    updatedById,
    createdAt,
    updatedAt,
  }) {
    if (departmentId !== null) this.departmentId = departmentId;
    if (departmentName !== null) this.departmentName = departmentName;
    if (createdById !== null) this.createdById = createdById;
    if (updatedById !== null) this.updatedById = updatedById;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
