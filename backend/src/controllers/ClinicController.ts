import { Hono } from 'hono';
import { ClinicAppService } from '../application/ClinicAppService';

const router = new Hono();
const service = new ClinicAppService();

router.post('/', async c => {
  const data = await c.req.json();
  const clinic = await service.create(data);
  return c.json({ success: true, data: clinic });
});

router.get('/', async c => {
  const clinics = await service.list();
  return c.json({ success: true, data: clinics });
});

export default router;
