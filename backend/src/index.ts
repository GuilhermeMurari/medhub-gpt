import rep from "./routes/representante";
import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => c.text('API MedHub')); 

app.route("/representantes", rep);
serve({ fetch: app.fetch, port: 3000 });
