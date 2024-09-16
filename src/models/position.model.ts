export class Position {
  positionId?: number;
  positionName?: string;
  salaryCoefficient?: number;
  leaveId?: string;

  constructor({ positionId, positionName, salaryCoefficient, leaveId }) {
    if (positionId !== null) this.positionId = positionId;
    if (positionName !== null) this.positionName = positionName;
    if (salaryCoefficient !== null) this.salaryCoefficient = salaryCoefficient;
    if (leaveId !== null) this.leaveId = leaveId;
  }
}
