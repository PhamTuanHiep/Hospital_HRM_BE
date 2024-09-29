export class NursingTrainingResults {
  trainingResultsId?: number;
  userId?: number;
  understandingOfNursingTheory?: number;
  clinicalSkills?: number;
  medicationAndTreatmentManagementSkills?: number;
  basicCareSkills?: number;
  communicationSkillsWithPatientsAndTheirFamilies?: number;
  patientRecordManagementSkills?: number;
  patientMonitoringAndAssessmentSkills?: number;
  abilityToAdaptToTheWorkEnvironment?: number;
  averageScore?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    trainingResultsId,
    userId,
    understandingOfNursingTheory,
    clinicalSkills,
    medicationAndTreatmentManagementSkills,
    basicCareSkills,
    communicationSkillsWithPatientsAndTheirFamilies,
    patientRecordManagementSkills,
    patientMonitoringAndAssessmentSkills,
    abilityToAdaptToTheWorkEnvironment,
    averageScore,
    createdAt,
    updatedAt,
  }) {
    if (trainingResultsId !== null) this.trainingResultsId = trainingResultsId;
    if (userId !== null) this.userId = userId;
    if (understandingOfNursingTheory !== null)
      this.understandingOfNursingTheory = understandingOfNursingTheory;
    if (clinicalSkills !== null) this.clinicalSkills = clinicalSkills;
    if (medicationAndTreatmentManagementSkills !== null)
      this.medicationAndTreatmentManagementSkills =
        medicationAndTreatmentManagementSkills;
    if (basicCareSkills !== null) this.basicCareSkills = basicCareSkills;
    if (communicationSkillsWithPatientsAndTheirFamilies !== null)
      this.communicationSkillsWithPatientsAndTheirFamilies =
        communicationSkillsWithPatientsAndTheirFamilies;
    if (patientRecordManagementSkills !== null)
      this.patientRecordManagementSkills = patientRecordManagementSkills;
    if (patientMonitoringAndAssessmentSkills !== null)
      this.patientMonitoringAndAssessmentSkills =
        patientMonitoringAndAssessmentSkills;

    if (abilityToAdaptToTheWorkEnvironment !== null)
      this.abilityToAdaptToTheWorkEnvironment =
        abilityToAdaptToTheWorkEnvironment;
    if (averageScore !== null) this.averageScore = averageScore;
    if (createdAt !== null) this.createdAt = createdAt;
    if (updatedAt !== null) this.updatedAt = updatedAt;
  }
}
