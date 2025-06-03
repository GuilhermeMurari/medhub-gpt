import { Hono } from 'hono';

const rep = new Hono();

rep.post('/', async (c) => {
  const data = await c.req.json();
  // TODO: salvar dados e enviar código de verificação
  return c.json({ mensagem: 'Código de verificação enviado' });
});

export default rep;
