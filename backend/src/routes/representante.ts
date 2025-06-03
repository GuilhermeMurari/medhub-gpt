import { Hono } from 'hono';
import { supabase } from '../supabase';

const rep = new Hono();

rep.post('/', async (c) => {
  const { nome, email, telefone, whatsapp, senha } = await c.req.json();
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: false,
    user_metadata: { nome, telefone, whatsapp, perfil: 'clinica' }
  });
  if (error || !data.user) {
    return c.json({ erro: error?.message }, 400);
  }

  // gera código de verificação e envia por email
  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Código de verificação para ${email}: ${codigo}`);
  // TODO: enviar email real

  return c.json({ mensagem: 'Código de verificação enviado' });
});

export default rep;
