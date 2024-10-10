import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('medical-training-results') //table name
export class MedicalTrainingResultsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'training_results_id' })
  trainingResultsId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.medicalTrainingResults)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'understanding_of_medical_theory' })
  understandingOfMedicalTheory: number;

  @Column({ name: 'knowledge_of_treatment_protocols' })
  knowledgeOfTreatmentProtocols: number;

  @Column({ name: 'ability_to_learn_new_knowledge' })
  abilityToLearnNewKnowledge: number;

  @Column({ name: 'diagnostic_skills' })
  diagnosticSkills: number;

  @Column({ name: 'treatment_skills' })
  treatmentSkills: number;

  @Column({ name: 'decision_making_skills' })
  decisionMakingSkills: number;

  @Column({ name: 'communication_skills_with_patients_and_their_families' })
  communicationSkillsWithPatientsAndTheirFamilies: number;

  @Column({ name: 'communication_skills_with_colleagues' })
  communicationSkillsWithColleagues: number;

  @Column({ name: 'patient_monitoring_and_care' })
  patientMonitoringAndCare: number;

  @Column({ name: 'participation_in_medical_research' })
  participationInMedicalResearch: number;

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
      this.understandingOfMedicalTheory +
      this.knowledgeOfTreatmentProtocols +
      this.abilityToLearnNewKnowledge +
      this.diagnosticSkills +
      this.treatmentSkills +
      this.decisionMakingSkills +
      this.communicationSkillsWithPatientsAndTheirFamilies +
      this.communicationSkillsWithColleagues +
      this.patientMonitoringAndCare +
      this.participationInMedicalResearch;
    let count = 10;
    this.averageScore = sum / count;
  }
}
