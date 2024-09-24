export class Position {
  positionId?: string;
  positionName?: string;
  salaryCoefficient?: number;
  jobDescription?: string[];
  leaveId?: string;

  constructor({
    positionId,
    positionName,
    salaryCoefficient,
    jobDescription,
    leaveId,
  }) {
    if (positionId !== null) this.positionId = positionId;
    if (positionName !== null) this.positionName = positionName;
    if (salaryCoefficient !== null) this.salaryCoefficient = salaryCoefficient;
    if (jobDescription !== null) this.jobDescription = jobDescription;
    if (leaveId !== null) this.leaveId = leaveId;
  }
}
