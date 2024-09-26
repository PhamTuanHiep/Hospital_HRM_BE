export class Evaluate {
  evaluateId?: number;
  userId?: number;
  workLoad?: number;
  quanlityOfWork?: number;
  capacityOfWork?: number;
  quantityOfScientificWorks?: number;
  workInitiatives?: number;
  professionalEthics?: number;
  workingStyle?: number;
  responsibilityForWork?: number;
  workAttitude?: number;
  workSpirit?: number;
  workResult?: number;
  averageScore?: number;

  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    evaluateId,
    userId,
    workLoad,
    quanlityOfWork,
    capacityOfWork,
    quantityOfScientificWorks,
    workInitiatives,
    professionalEthics,
    workingStyle,
    responsibilityForWork,
    workAttitude,
    workSpirit,
    workResult,
    averageScore,
    createdAt,
    updatedAt,
  }) {
    if (evaluateId !== null) this.evaluateId = evaluateId;
    if (userId !== null) this.userId = userId;
    if (workLoad !== null) this.workLoad = workLoad;
    if (quanlityOfWork !== null) this.quanlityOfWork = quanlityOfWork;
    if (capacityOfWork !== null) this.capacityOfWork = capacityOfWork;
    if (quantityOfScientificWorks !== null)
      this.quantityOfScientificWorks = quantityOfScientificWorks;
    if (workInitiatives !== null) this.workInitiatives = workInitiatives;
    if (professionalEthics !== null)
      this.professionalEthics = professionalEthics;
    if (workingStyle !== null) this.workingStyle = workingStyle;
    if (responsibilityForWork !== null)
      this.responsibilityForWork = responsibilityForWork;
    if (workAttitude !== null) this.workAttitude = workAttitude;
    if (workSpirit !== null) this.workSpirit = workSpirit;
    if (workResult !== null) this.workResult = workResult;
    if (averageScore !== null) this.averageScore = averageScore;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
