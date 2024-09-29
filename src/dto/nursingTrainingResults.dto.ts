import { IsNotEmpty, Max, Min } from 'class-validator';

export class NursingTrainingResultsDto {
  trainingResultsId?: number;

  @IsNotEmpty()
  userId?: number;

  @Min(1)
  @Max(5)
  understandingOfNursingTheory: number;

  @Min(1)
  @Max(5)
  clinicalSkills: number;

  @Min(1)
  @Max(5)
  medicationAndTreatmentManagementSkills: number;

  @Min(1)
  @Max(5)
  basicCareSkills: number;

  @Min(1)
  @Max(5)
  communicationSkillsWithPatientsAndTheirFamilies: number;

  @Min(1)
  @Max(5)
  patientRecordManagementSkills: number;

  @Min(1)
  @Max(5)
  patientMonitoringAndAssessmentSkills: number;

  @Min(1)
  @Max(5)
  abilityToAdaptToTheWorkEnvironment: number;

  averageScore?: number;

  createdAt?: Date;

  updatedAt?: Date;
}
