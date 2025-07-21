import { Hono } from 'hono';
import { AuthAppService } from '../application/AuthAppService';

const router = new Hono();
const service = new AuthAppService();

router.post('/login', async c => {
  const { email, password } = await c.req.json();
  const result = await service.login(email, password);
  if (!result) return c.json({ error: 'invalid_credentials' }, 401);
  return c.json({ token: result.token, user: result.user, expiresIn: result.expiresIn });
});

export default router;
