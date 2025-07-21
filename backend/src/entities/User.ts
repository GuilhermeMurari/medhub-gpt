import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Clinic } from './Clinic';
import { HealthOperator } from './HealthOperator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({
    type: 'enum',
    enum: ['clinic', 'health_operator', 'admin', 'backoffice'],
  })
  role!: 'clinic' | 'health_operator' | 'admin' | 'backoffice';

  @Column({ nullable: true, length: 500 })
  avatar?: string;

  @Column({ nullable: true, type: 'uuid' })
  clinicId?: string;

  @Column({ nullable: true, type: 'uuid' })
  operatorId?: string;

  @Column('simple-array', { nullable: true })
  permissions?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => Clinic, clinic => clinic.users)
  clinic?: Clinic;

  @ManyToOne(() => HealthOperator, operator => operator.users)
  operator?: HealthOperator;
}
