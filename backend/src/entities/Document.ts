import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Clinic } from './Clinic';
import { HealthOperator } from './HealthOperator';
import { User } from './User';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 100 })
  type!: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected', 'expired'],
    default: 'pending',
  })
  status!: 'pending' | 'approved' | 'rejected' | 'expired';

  @Column({ type: 'text', nullable: true })
  url?: string;

  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;

  @Column({ nullable: true })
  expiryDate?: Date;

  @Column({ nullable: true })
  validityPeriod?: number;

  @Column({ nullable: true, type: 'uuid' })
  clinicId?: string;

  @Column({ nullable: true, type: 'uuid' })
  operatorId?: string;

  @Column({ nullable: true, type: 'uuid' })
  approvedBy?: string;

  @Column({ nullable: true })
  approvedAt?: Date;

  @Column({ nullable: true, type: 'uuid' })
  rejectedBy?: string;

  @Column({ nullable: true })
  rejectedAt?: Date;

  @CreateDateColumn()
  uploadedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Clinic, clinic => clinic.documents)
  clinic?: Clinic;

  @ManyToOne(() => HealthOperator, operator => operator.documents)
  operator?: HealthOperator;

  @ManyToOne(() => User)
  approver?: User;

  @ManyToOne(() => User)
  rejector?: User;
}
