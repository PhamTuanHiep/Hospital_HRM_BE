import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('nursing-training-results') //table name
export class NursingTrainingResultsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'training_results_id' })
  trainingResultsId: number;

  @Column({ name: 'user_id' })
  userId: number;

  // @ManyToOne(() => UserEntity, (user) => user.nursingTrainingResults)
  // @JoinColumn({ name: 'user_id' })
  // user: UserEntity;

  @Column({ name: 'understanding_of_nursing_theory' })
  understandingOfNursingTheory: number;

  @Column({ name: 'clinical_skills' })
  clinicalSkills: number;

  @Column({ name: 'medication_and_treatment_management_skills' })
  medicationAndTreatmentManagementSkills: number;

  @Column({ name: 'basic_care_skills' })
  basicCareSkills: number;

  @Column({ name: 'communication_skills_with_patients_and_their_families' })
  communicationSkillsWithPatientsAndTheirFamilies: number;

  @Column({ name: 'patient_record_management_skills' })
  patientRecordManagementSkills: number;

  @Column({ name: 'patient_monitoring_and_assessment_skills' })
  patientMonitoringAndAssessmentSkills: number;

  @Column({ name: 'ability_to_adapt_to_the_work_environment' })
  abilityToAdaptToTheWorkEnvironment: number;

  @Column({
    type: 'decimal',
    name: 'average_score',
    precision: 2,
    scale: 1,
    nullable: true,
  })
  averageScore: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  // Tính toán giá trị trung bình trước khi insert
  @BeforeInsert()
  @BeforeUpdate()
  calculateAverage() {
    let sum =
      this.understandingOfNursingTheory +
      this.clinicalSkills +
      this.medicationAndTreatmentManagementSkills +
      this.basicCareSkills +
      this.communicationSkillsWithPatientsAndTheirFamilies +
      this.patientRecordManagementSkills +
      this.patientMonitoringAndAssessmentSkills +
      this.abilityToAdaptToTheWorkEnvironment;
    let count = 8;
    this.averageScore = sum / count;
  }
}
