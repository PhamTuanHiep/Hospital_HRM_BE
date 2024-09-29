import { IsNotEmpty, Max, Min } from 'class-validator';

export class MedicalTrainingResultsDto {
  trainingResultsId?: number;

  @IsNotEmpty()
  userId?: number;

  @Min(1)
  @Max(5)
  understandingOfMedicalTheory?: number;

  @Min(1)
  @Max(5)
  knowledgeOfTreatmentProtocols?: number;

  @Min(1)
  @Max(5)
  abilityToLearnNewKnowledge?: number;

  @Min(1)
  @Max(5)
  diagnosticSkills?: number;

  @Min(1)
  @Max(5)
  treatmentSkills?: number;

  @Min(1)
  @Max(5)
  decisionMakingSkills?: number;

  @Min(1)
  @Max(5)
  communicationSkillsWithPatientsAndTheirFamilies?: number;

  @Min(1)
  @Max(5)
  communicationSkillsWithColleagues?: number;

  @Min(1)
  @Max(5)
  patientMonitoringAndCare?: number;

  @Min(1)
  @Max(5)
  participationInMedicalResearch?: number;

  averageScore?: number;

  createdAt?: Date;

  updatedAt?: Date;
}
