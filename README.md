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

### MedSênior Scraper
Para baixar os dados do guia médico direto no navegador:

1. Abra o Chrome DevTools na página do [Guia Médico da MedSênior](https://guiamedico.medsenior.com.br/).
2. Cole o conteúdo de `scripts/medsenior_scraper.js` no console.
   O script cria automaticamente botões de scraping para cada UF.
3. Clique no botão de uma UF para iniciar a coleta. Ao finalizar, aparecerá
   um botão "Baixar JSON - UF" para salvar o arquivo.
