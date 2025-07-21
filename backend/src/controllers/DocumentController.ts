import { Hono } from 'hono';
import { DocumentAppService } from '../application/DocumentAppService';

const router = new Hono();
const service = new DocumentAppService();

router.post('/', async c => {
  const data = await c.req.parseBody();
  const { type, clinicId, operatorId, name } = data;
  // In real scenario file handling would occur here
  const doc = await service.create({
    type: type as string,
    clinicId: clinicId as string | undefined,
    operatorId: operatorId as string | undefined,
    name: (name as string) || 'uploaded',
  });
  return c.json(doc, 201);
});

router.post('/:id/approve', async c => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const result = await service.approve(id, { expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined });
  if (!result) return c.json({ error: 'not_found' }, 404);
  return c.json(result);
});

router.post('/:id/reject', async c => {
  const id = c.req.param('id');
  const body = await c.req.json();
  if (!body.reason) return c.json({ error: 'reason_required' }, 400);
  const result = await service.reject(id, body.reason);
  if (!result) return c.json({ error: 'not_found' }, 404);
  return c.json(result);
});

export default router;
