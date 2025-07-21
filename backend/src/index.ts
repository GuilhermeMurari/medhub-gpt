import { serve } from '@hono/node-server';
import { createApp } from './app';

createApp().then(({ app }) => {
  serve({ fetch: app.fetch, port: 3000 });
});
