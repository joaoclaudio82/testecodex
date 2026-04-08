async function getJSON(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Falha ao buscar dados');
  return resp.json();
}

function nav() {
  return `
  <header>
    <h2>Monitor de Tendência Eleitoral</h2>
    <nav>
      <a href="/">Visão Geral</a>
      <a href="/analises">Análises</a>
      <a href="/candidatos">Candidatos</a>
      <a href="/historico">Histórico</a>
    </nav>
  </header>`;
}
