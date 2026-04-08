const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { candidates, records } = require('../data/mock-data');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function sendFile(res, filePath) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = ext === '.css'
    ? 'text/css; charset=utf-8'
    : ext === '.js'
      ? 'application/javascript; charset=utf-8'
      : 'text/html; charset=utf-8';

  res.writeHead(200, { 'Content-Type': contentType });
  res.end(fs.readFileSync(filePath));
}

function applyFilters(items, query) {
  return items.filter((item) => {
    if (query.candidate && Number(query.candidate) !== item.candidate_id) return false;
    if (query.category && query.category !== item.category) return false;
    if (query.source && query.source !== item.source) return false;
    return true;
  });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (req.method === 'GET' && pathname.startsWith('/api/overview')) {
    const filtered = applyFilters(records, Object.fromEntries(url.searchParams.entries()));
    const summary = filtered.reduce((acc, cur) => {
      if (!acc[cur.candidate_id]) {
        acc[cur.candidate_id] = { candidate: cur.candidate, positivo: 0, neutro: 0, negativo: 0, total: 0 };
      }
      acc[cur.candidate_id][cur.sentiment] += 1;
      acc[cur.candidate_id].total += 1;
      return acc;
    }, {});

    return sendJson(res, 200, {
      totals: {
        noticias: filtered.length,
        positivas: filtered.filter((r) => r.sentiment === 'positivo').length,
        neutras: filtered.filter((r) => r.sentiment === 'neutro').length,
        negativas: filtered.filter((r) => r.sentiment === 'negativo').length
      },
      byCandidate: Object.values(summary),
      filters: {
        candidates: candidates.filter((c) => c.is_active),
        categories: [...new Set(records.map((r) => r.category))],
        sources: [...new Set(records.map((r) => r.source))]
      }
    });
  }

  if (req.method === 'GET' && pathname === '/api/analises') {
    const filtered = applyFilters(records, Object.fromEntries(url.searchParams.entries()));
    return sendJson(res, 200, { items: filtered });
  }

  if (req.method === 'GET' && pathname === '/api/historico') {
    const filtered = applyFilters(records, Object.fromEntries(url.searchParams.entries()));
    const byDay = filtered.reduce((acc, cur) => {
      const key = `${cur.date}-${cur.candidate_id}`;
      if (!acc[key]) {
        acc[key] = { date: cur.date, candidate_id: cur.candidate_id, candidate: cur.candidate, positivo: 0, neutro: 0, negativo: 0 };
      }
      acc[key][cur.sentiment] += 1;
      return acc;
    }, {});

    return sendJson(res, 200, { series: Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date)) });
  }

  if (req.method === 'GET' && pathname === '/api/candidatos') {
    return sendJson(res, 200, { items: candidates });
  }

  if (req.method === 'POST' && pathname === '/api/candidatos') {
    try {
      const body = await parseBody(req);
      const { full_name, display_name, party } = body;
      if (!full_name || !display_name) {
        return sendJson(res, 400, { error: 'full_name e display_name são obrigatórios' });
      }
      const nextId = Math.max(...candidates.map((c) => c.id)) + 1;
      const candidate = { id: nextId, full_name, display_name, party: party || null, is_active: true };
      candidates.push(candidate);
      return sendJson(res, 201, candidate);
    } catch (_e) {
      return sendJson(res, 400, { error: 'JSON inválido' });
    }
  }

  if (req.method === 'PATCH' && pathname.startsWith('/api/candidatos/')) {
    try {
      const id = Number(pathname.split('/').pop());
      const candidate = candidates.find((c) => c.id === id);
      if (!candidate) return sendJson(res, 404, { error: 'Candidato não encontrado' });

      const body = await parseBody(req);
      const { full_name, display_name, party, is_active } = body;
      if (full_name !== undefined) candidate.full_name = full_name;
      if (display_name !== undefined) candidate.display_name = display_name;
      if (party !== undefined) candidate.party = party;
      if (is_active !== undefined) candidate.is_active = Boolean(is_active);

      return sendJson(res, 200, candidate);
    } catch (_e) {
      return sendJson(res, 400, { error: 'JSON inválido' });
    }
  }

  const routes = {
    '/': 'index.html',
    '/analises': 'analises.html',
    '/candidatos': 'candidatos.html',
    '/historico': 'historico.html'
  };

  if (routes[pathname]) {
    return sendFile(res, path.join(publicDir, routes[pathname]));
  }

  if (pathname.endsWith('.css') || pathname.endsWith('.js')) {
    return sendFile(res, path.join(publicDir, path.basename(pathname)));
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`App disponível em http://localhost:${PORT}`);
});
