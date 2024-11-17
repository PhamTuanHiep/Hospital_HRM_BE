export class Position {
  positionId?: string;
  positionName?: string;

  leaveId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    positionId,
    positionName,

    leaveId,
    createdAt,
    updatedAt,
  }) {
    if (positionId !== null) this.positionId = positionId;
    if (positionName !== null) this.positionName = positionName;

    if (leaveId !== null) this.leaveId = leaveId;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
