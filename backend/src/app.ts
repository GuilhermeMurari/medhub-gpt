import 'dotenv/config';
import 'reflect-metadata';
import { Hono } from 'hono';
import { DataSource } from 'typeorm';
import { serve } from '@hono/node-server';
import { AppDataSource } from './config/data-source';
import authController from './controllers/AuthController';
import clinicController from './controllers/ClinicController';
import documentController from './controllers/DocumentController';

export async function createApp(dataSource: DataSource = AppDataSource) {
  await dataSource.initialize();

  const app = new Hono();

  app.get('/', (c) => c.text('API MedHub'));
  app.route('/api/auth', authController);
  app.route('/api/clinics', clinicController);
  app.route('/api/documents', documentController);

  return { app, dataSource };
}

if (require.main === module) {
  createApp().then(({ app }) => {
    serve({ fetch: app.fetch, port: 3000 });
  });
}
