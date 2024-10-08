export class Position {
  positionId?: string;
  positionName?: string;
  salaryCoefficient?: number;
  leaveId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    positionId,
    positionName,
    salaryCoefficient,
    leaveId,
    createdAt,
    updatedAt,
  }) {
    if (positionId !== null) this.positionId = positionId;
    if (positionName !== null) this.positionName = positionName;
    if (salaryCoefficient !== null) this.salaryCoefficient = salaryCoefficient;
    if (leaveId !== null) this.leaveId = leaveId;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
