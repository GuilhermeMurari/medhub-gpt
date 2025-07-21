import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Document } from './Document';

@Entity('health_operators')
export class HealthOperator {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255, nullable: true })
  fantasyName?: string;

  @Column({ unique: true, length: 18 })
  cnpj!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 20 })
  phone!: string;

  @Column({ type: 'text' })
  address!: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'pending'],
    default: 'pending',
  })
  status!: 'active' | 'inactive' | 'pending';

  @Column({ length: 255 })
  responsibleName!: string;

  @Column({ length: 14 })
  responsibleCpf!: string;

  @Column('simple-array', { nullable: true })
  interestedProfessions?: string[];

  @Column('simple-array', { nullable: true })
  coverageAreas?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => User, user => user.operator)
  users!: User[];

  @OneToMany(() => Document, document => document.operator)
  documents!: Document[];
}
