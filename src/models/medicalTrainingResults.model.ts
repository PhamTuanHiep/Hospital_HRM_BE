export class MedicalTrainingResults {
  trainingResultsId?: number;
  userId?: number;
  understandingOfMedicalTheory?: number;
  knowledgeOfTreatmentProtocols?: number;
  abilityToLearnNewKnowledge?: number;
  diagnosticSkills?: number;
  treatmentSkills?: number;
  decisionMakingSkills?: number;
  communicationSkillsWithPatientsAndTheirFamilies?: number;
  communicationSkillsWithColleagues?: number;
  patientMonitoringAndCare?: number;
  participationInMedicalResearch?: number;
  averageScore?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    trainingResultsId,
    userId,
    understandingOfMedicalTheory,
    knowledgeOfTreatmentProtocols,
    abilityToLearnNewKnowledge,
    diagnosticSkills,
    treatmentSkills,
    decisionMakingSkills,
    communicationSkillsWithPatientsAndTheirFamilies,
    communicationSkillsWithColleagues,
    patientMonitoringAndCare,
    participationInMedicalResearch,
    averageScore,
    createdAt,
    updatedAt,
  }) {
    if (trainingResultsId !== null) this.trainingResultsId = trainingResultsId;
    if (userId !== null) this.userId = userId;
    if (understandingOfMedicalTheory !== null)
      this.understandingOfMedicalTheory = understandingOfMedicalTheory;
    if (knowledgeOfTreatmentProtocols !== null)
      this.knowledgeOfTreatmentProtocols = knowledgeOfTreatmentProtocols;
    if (abilityToLearnNewKnowledge !== null)
      this.abilityToLearnNewKnowledge = abilityToLearnNewKnowledge;
    if (diagnosticSkills !== null) this.diagnosticSkills = diagnosticSkills;
    if (treatmentSkills !== null) this.treatmentSkills = treatmentSkills;
    if (decisionMakingSkills !== null)
      this.decisionMakingSkills = decisionMakingSkills;
    if (communicationSkillsWithPatientsAndTheirFamilies !== null)
      this.communicationSkillsWithPatientsAndTheirFamilies =
        communicationSkillsWithPatientsAndTheirFamilies;
    if (communicationSkillsWithColleagues !== null)
      this.communicationSkillsWithColleagues =
        communicationSkillsWithColleagues;
    if (patientMonitoringAndCare !== null)
      this.patientMonitoringAndCare = patientMonitoringAndCare;
    if (participationInMedicalResearch !== null)
      this.participationInMedicalResearch = participationInMedicalResearch;
    if (averageScore !== null) this.averageScore = averageScore;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
