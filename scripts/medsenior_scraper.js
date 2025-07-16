/**
 * Simple scraper for MedSênior medical guide.
 * Intended to run in Chrome's DevTools console.
 * Customize `SCRAPER_OPTIONS` below if needed and
 * paste this whole script into the console.
 * Scraping buttons will appear automatically.
 */

const SCRAPER_OPTIONS = {
  codPlano: '31-MG',
  codEspecialidade: 71,
  filtroEspecialidade: 'consulta',
  ufs: ['DF', 'ES', 'MG', 'PR', 'RJ', 'RS', 'SP'],
  concurrency: 4,
};

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchWithRetry(url, opts = {}, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, opts);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn('Retry', attempt + 1, url);
      await sleep(1000 * Math.pow(2, attempt));
    }
  }
}

async function getCities(uf) {
  const url = `https://guiamedico-api.cloud.medsenior.com.br/guiamedico/cidades/${uf}`;
  const json = await fetchWithRetry(url);
  return json.data || [];
}

async function getPrestadores({ codPlano, codEspecialidade, uf, codCidade, filtroEspecialidade = 'consulta' }) {
  let page = 1;
  const results = [];
  while (true) {
    const params = new URLSearchParams({
      pagina: page,
      qtdPorPagina: 20,
      codPlano,
      codEspecialidade,
      uf,
      codCidade,
      filtroEspecialidade,
    });
    const url = `https://guiamedico-api.cloud.medsenior.com.br/v2/guiamedicov2/prestadores?${params.toString()}`;
    const json = await fetchWithRetry(url);
    if (!json.data) break;
    results.push(...json.data.dados);
    if (page >= json.data.totalPaginas) break;
    page++;
  }
  return results;
}

async function asyncPool(limit, array, iterator) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iterator(item));
    ret.push(p);
    if (limit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

async function run({ codPlano, codEspecialidade, uf, filtroEspecialidade = 'consulta', concurrency = 4 }) {
  const cidades = await getCities(uf);
  const results = [];
  await asyncPool(concurrency, cidades, async (cidade) => {
    const dados = await getPrestadores({ codPlano, codEspecialidade, uf, codCidade: cidade.codigo, filtroEspecialidade });
    results.push({ cidade: cidade.nome, dados });
  });
  console.log('Finalizado', uf, results);
  return results;
}

function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function addDownloadButtons({ codPlano, codEspecialidade, filtroEspecialidade = 'consulta', ufs = ['DF', 'ES', 'MG', 'PR', 'RJ', 'RS', 'SP'], concurrency = 4 }) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '10px';
  container.style.right = '10px';
  container.style.background = '#fff';
  container.style.border = '1px solid #ccc';
  container.style.padding = '8px';
  container.style.zIndex = 99999;
  ufs.forEach((uf) => {
    const btn = document.createElement('button');
    btn.textContent = `Scrap ${uf}`;
    btn.style.margin = '2px';
    btn.onclick = async () => {
      btn.disabled = true;
      btn.textContent = `Coletando ${uf}...`;
      try {
        const data = await run({ codPlano, codEspecialidade, uf, filtroEspecialidade, concurrency });
        const dlBtn = document.createElement('button');
        dlBtn.textContent = `Baixar JSON - ${uf}`;
        dlBtn.style.margin = '2px';
        dlBtn.onclick = () => downloadJSON(`${uf}.json`, data);
        container.appendChild(dlBtn);
      } catch (err) {
        console.error(err);
      }
      btn.textContent = `Scrap ${uf}`;
      btn.disabled = false;
    };
    container.appendChild(btn);
  });
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Fechar';
  closeBtn.style.margin = '2px';
  closeBtn.onclick = () => container.remove();
  container.appendChild(closeBtn);
  document.body.appendChild(container);
}

// Automatically insert the scraping buttons when the script loads
addDownloadButtons(SCRAPER_OPTIONS);
