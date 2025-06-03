import { Hono } from 'hono';
import { supabase } from '../supabase';

const rep = new Hono();

rep.post('/', async (c) => {
  const data = await c.req.json();
  const { error } = await supabase.from('representantes').insert(data);
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  // TODO: enviar código de verificação
  return c.json({ mensagem: 'Código de verificação enviado' });
});

export default rep;
