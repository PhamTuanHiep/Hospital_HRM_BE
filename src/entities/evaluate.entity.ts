import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('evaluates') //table name
export class EvaluateEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'evaluate_id' }) //auto fill, increase, primary key
  evaluateId: number;

  @Column({ name: 'full_name' })
  userId: number;

  @Column({ name: 'work_load' })
  workLoad: number;

  @Column({ name: 'quanlity_of_work' })
  quanlityOfWork: number;

  @Column({ name: 'capacity_of_work' })
  capacityOfWork: number;

  @Column({ name: 'quantity_of_scientific_works' })
  quantityOfScientificWorks: number;

  @Column({ name: 'work_initiatives' })
  workInitiatives: number;

  @Column({ name: 'professional_ethics' })
  professionalEthics: number;

  @Column({ name: 'working_style' })
  workingStyle: number;

  @Column({
    name: 'responsibility_for_work',
  })
  responsibilityForWork: number;

  @Column({ name: 'work_attitude' })
  workAttitude: number;

  @Column({ name: 'work_spirit' })
  workSpirit: number;

  @Column({ name: 'work_result' })
  workResult: number;
}
