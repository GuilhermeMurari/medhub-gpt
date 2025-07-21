import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { newDb, DataType } from 'pg-mem';
import crypto from 'crypto';
import { User } from '../src/entities/User';
import { Clinic } from '../src/entities/Clinic';
import { HealthOperator } from '../src/entities/HealthOperator';
import { Document } from '../src/entities/Document';
import { AuthService } from '../src/domain/AuthService';
import bcrypt from 'bcryptjs';

const db = newDb();
db.public.registerFunction({ name: 'version', returns: DataType.text, implementation: () => 'pg-mem' });
db.public.registerFunction({ name: 'current_database', returns: DataType.text, implementation: () => 'test' });
db.public.registerFunction({ name: 'uuid_generate_v4', returns: DataType.uuid, implementation: () => crypto.randomUUID() });
const testDataSource = db.adapters.createTypeormDataSource({
  type: 'postgres',
  entities: [User, Clinic, HealthOperator, Document],
  synchronize: true,
});

jest.mock('../src/config/data-source', () => ({
  get AppDataSource() {
    return testDataSource;
  },
}));

describe('AuthService', () => {
  beforeAll(async () => {
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it('logs in a valid user', async () => {
    const repo = testDataSource.getRepository(User);
    const passwordHash = await bcrypt.hash('secret', 10);
    const user = repo.create({
      name: 'Test',
      email: 'test@example.com',
      password: passwordHash,
      role: 'clinic',
      isActive: true,
    });
    await repo.save(user);

    const auth = new AuthService();
    const result = await auth.login('test@example.com', 'secret');

    expect(result).toBeTruthy();
    expect(result?.token).toEqual(expect.any(String));
    expect(result?.user.email).toBe('test@example.com');
  });

  it('rejects invalid credentials', async () => {
    const auth = new AuthService();
    const result = await auth.login('wrong@example.com', 'wrong');
    expect(result).toBeNull();
  });
});
