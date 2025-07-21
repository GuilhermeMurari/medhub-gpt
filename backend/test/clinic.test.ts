import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { newDb, DataType } from 'pg-mem';
import crypto from 'crypto';
import { Clinic } from '../src/entities/Clinic';
import { User } from '../src/entities/User';
import { Document } from '../src/entities/Document';
import { HealthOperator } from '../src/entities/HealthOperator';
import { ClinicAppService } from '../src/application/ClinicAppService';

const db = newDb();
db.public.registerFunction({ name: 'version', returns: DataType.text, implementation: () => 'pg-mem' });
db.public.registerFunction({ name: 'current_database', returns: DataType.text, implementation: () => 'test' });
db.public.registerFunction({ name: 'uuid_generate_v4', returns: DataType.uuid, implementation: () => crypto.randomUUID() });
const testDataSource = db.adapters.createTypeormDataSource({
  type: 'postgres',
  entities: [Clinic, User, HealthOperator, Document],
  synchronize: true,
});

jest.mock('../src/config/data-source', () => ({
  get AppDataSource() {
    return testDataSource;
  },
}));

describe('ClinicAppService', () => {
  const service = new ClinicAppService();

  beforeAll(async () => {
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it('creates and lists clinics', async () => {
    await service.create({
      name: 'Clinica X',
      cnpj: '00000000000191',
      email: 'c@x.com',
      phone: '999999999',
      address: 'Street 123',
      responsibleName: 'John Doe',
      responsibleCpf: '00000000000',
      responsiblePhone: '999999999',
      responsibleEmail: 'john@x.com',
    });

    const list = await service.list();
    expect(list.length).toBe(1);
    expect(list[0].name).toBe('Clinica X');
  });
});
