export class Position {
  positionId?: string;
  positionName?: string;
  salaryCoefficient?: number;
  leaveId?: string;
  createdById?: number;
  updatedById?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    positionId,
    positionName,
    salaryCoefficient,
    leaveId,
    createdById,
    updatedById,
    createdAt,
    updatedAt,
  }) {
    if (positionId !== null) this.positionId = positionId;
    if (positionName !== null) this.positionName = positionName;
    if (salaryCoefficient !== null) this.salaryCoefficient = salaryCoefficient;
    if (leaveId !== null) this.leaveId = leaveId;
    if (createdById !== null) this.createdById = createdById;
    if (updatedById !== null) this.updatedById = updatedById;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
