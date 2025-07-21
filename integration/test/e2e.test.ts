import 'reflect-metadata';
import { newDb, DataType } from 'pg-mem';
import crypto from 'crypto';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { serve } from '@hono/node-server';
import { DataSource } from '../../backend/node_modules/typeorm';

const db = newDb();
db.public.registerFunction({ name: 'version', returns: DataType.text, implementation: () => 'pg-mem' });
db.public.registerFunction({ name: 'current_database', returns: DataType.text, implementation: () => 'test' });
db.public.registerFunction({ name: 'uuid_generate_v4', returns: DataType.uuid, implementation: () => crypto.randomUUID() });
let dataSource: DataSource = db.adapters.createTypeormDataSource({
  type: 'postgres',
  entities: [/* entities will be overwritten after import */],
  synchronize: true,
});

jest.mock('../../backend/src/config/data-source', () => ({
  get AppDataSource() {
    return dataSource;
  },
}));

import { createApp } from '../../backend/src/app';
import { User } from '../../backend/src/entities/User';
import { Clinic } from '../../backend/src/entities/Clinic';
import { HealthOperator } from '../../backend/src/entities/HealthOperator';
import { Document } from '../../backend/src/entities/Document';
let server: any;

beforeAll(async () => {
  dataSource.setOptions({
    entities: [User, Clinic, HealthOperator, Document],
  });
  const { app } = await createApp(dataSource);
  server = serve({ fetch: app.fetch, port: 4000 });
});

afterAll(async () => {
  server?.close();
  await dataSource.destroy();
});

test('login, create clinic and document flows', async () => {
  const userRepo = dataSource.getRepository(User);
  const passwordHash = await bcrypt.hash('secret', 10);
  const user = userRepo.create({
    name: 'Test User',
    email: 'user@example.com',
    password: passwordHash,
    role: 'clinic',
    isActive: true,
  });
  await userRepo.save(user);

  const loginRes = await axios.post('http://localhost:4000/api/auth/login', {
    email: 'user@example.com',
    password: 'secret',
  });
  expect(loginRes.status).toBe(200);
  expect(loginRes.data.token).toBeDefined();

  const clinicRes = await axios.post('http://localhost:4000/api/clinics', {
    name: 'Clinica A',
    cnpj: '00000000000191',
    email: 'clinic@a.com',
    phone: '999999999',
    address: 'Street 1',
    responsibleName: 'Alice',
    responsibleCpf: '00000000000',
    responsiblePhone: '999999999',
    responsibleEmail: 'alice@a.com'
  });
  expect(clinicRes.status).toBe(200);
  const listRes = await axios.get('http://localhost:4000/api/clinics');
  expect(listRes.data.data.length).toBe(1);

  const form = new URLSearchParams();
  form.append('type', 'crm');
  form.append('name', 'file.pdf');
  const docRes = await axios.post('http://localhost:4000/api/documents', form, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  expect(docRes.status).toBe(201);
  const docId = docRes.data.id as string;

  const approve = await axios.post(`http://localhost:4000/api/documents/${docId}/approve`, {});
  expect(approve.data.status).toBe('approved');
});
