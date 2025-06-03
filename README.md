# MedHub

Projeto para credenciamento de prestadores de serviços de saúde.

## Estrutura

- `frontend/` Aplicação React com Tailwind e Ant Design.
- `backend/` API em Hono.js executando como Cloudflare Worker.

## Desenvolvimento

### Frontend
```
cd frontend
npm install
npm run dev
```

### Backend
```
cd backend
npm install
npm run dev
```

Crie um arquivo `.env` na pasta `backend/` com a variável `SUPABASE_KEY` definida. Utilize o valor disponibilizado no painel do Supabase.
