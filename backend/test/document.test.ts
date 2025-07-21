import 'reflect-metadata';
import { newDb, DataType } from 'pg-mem';
import crypto from 'crypto';
import { Document } from '../src/entities/Document';
import { Clinic } from '../src/entities/Clinic';
import { User } from '../src/entities/User';
import { HealthOperator } from '../src/entities/HealthOperator';
import { DocumentService } from '../src/domain/DocumentService';

const db = newDb();
db.public.registerFunction({ name: 'version', returns: DataType.text, implementation: () => 'pg-mem' });
db.public.registerFunction({ name: 'current_database', returns: DataType.text, implementation: () => 'test' });
db.public.registerFunction({ name: 'uuid_generate_v4', returns: DataType.uuid, implementation: () => crypto.randomUUID() });
const testDataSource = db.adapters.createTypeormDataSource({
  type: 'postgres',
  entities: [Document, Clinic, User, HealthOperator],
  synchronize: true,
});

jest.mock('../src/config/data-source', () => ({
  get AppDataSource() {
    return testDataSource;
  },
}));

describe('DocumentService', () => {
  const service = new DocumentService();

  beforeAll(async () => {
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it('creates and approves a document', async () => {
    const doc = await service.create({ name: 'doc.pdf', type: 'alvara_prefeitura' });
    expect(doc.status).toBe('pending');

    const approved = await service.approve(doc.id, {});
    expect(approved?.status).toBe('approved');
  });

  it('rejects a document', async () => {
    const doc = await service.create({ name: 'other.pdf', type: 'crm' });
    const rejected = await service.reject(doc.id, 'invalid');
    expect(rejected?.status).toBe('rejected');
    expect(rejected?.rejectionReason).toBe('invalid');
  });
});
