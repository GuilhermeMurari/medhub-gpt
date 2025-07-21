import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Document } from './Document';

@Entity('clinics')
export class Clinic {
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
    enum: ['pending', 'documents', 'negotiation', 'contract', 'active', 'inactive'],
    default: 'pending',
  })
  status!: 'pending' | 'documents' | 'negotiation' | 'contract' | 'active' | 'inactive';

  @Column({ length: 255 })
  responsibleName!: string;

  @Column({ length: 14 })
  responsibleCpf!: string;

  @Column({ length: 20 })
  responsiblePhone!: string;

  @Column({ length: 255 })
  responsibleEmail!: string;

  @Column({ type: 'jsonb', nullable: true })
  bankingData?: {
    bank: string;
    agency: string;
    agencyDigit?: string;
    account: string;
    accountDigit?: string;
  };

  @Column('simple-array', { nullable: true })
  healthProfessions?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => User, user => user.clinic)
  users!: User[];

  @OneToMany(() => Document, document => document.clinic)
  documents!: Document[];
}
