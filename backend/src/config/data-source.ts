import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Clinic } from '../entities/Clinic';
import { HealthOperator } from '../entities/HealthOperator';
import { Document } from '../entities/Document';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'medhub',
  entities: [User, Clinic, HealthOperator, Document],
  synchronize: true,
});
