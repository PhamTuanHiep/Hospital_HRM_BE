import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('description-evaluates') //table name
export class DescriptionEvaluateEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'description_evaluate_id' }) //auto fill, increase, primary key
  descriptionEvaluateId: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'description_evaluate_english',
  })
  descriptionEvaluateEnglish: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'description_evaluate_viet_namese',
  })
  descriptionEvaluateVietNamese: string;

  @Column({ type: 'varchar', length: 250, name: 'note' })
  note: string;
}
