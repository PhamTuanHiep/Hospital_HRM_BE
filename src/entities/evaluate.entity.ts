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

@Entity('evaluates') //table name
export class EvaluateEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'evaluate_id' }) //auto fill, increase, primary key
  evaluateId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'int', name: 'work_load' })
  workLoad: number;

  @Column({ type: 'int', name: 'quanlity_of_work' })
  qualityOfWork: number;

  @Column({ type: 'int', name: 'capacity_of_work' })
  capacityOfWork: number;

  @Column({ type: 'int', name: 'quantity_of_scientific_works' })
  quantityOfScientificWorks: number;

  @Column({ type: 'int', name: 'work_initiatives' })
  workInitiatives: number;

  @Column({ type: 'int', name: 'professional_ethics' })
  professionalEthics: number;

  @Column({ type: 'int', name: 'working_style' })
  workingStyle: number;

  @Column({
    type: 'int',
    name: 'responsibility_for_work',
  })
  responsibilityForWork: number;

  @Column({ type: 'int', name: 'work_attitude' })
  workAttitude: number;

  @Column({ type: 'int', name: 'work_spirit' })
  workSpirit: number;

  @Column({ type: 'int', name: 'work_result' })
  workResult: number;

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
      this.workLoad +
      this.qualityOfWork +
      this.capacityOfWork +
      this.workInitiatives +
      this.workingStyle +
      this.responsibilityForWork +
      this.workAttitude +
      this.workSpirit +
      this.workResult;
    let count = 9;
    this.averageScore = sum / count;
  }
}
