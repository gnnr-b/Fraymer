function qs(id) { return document.getElementById(id); }

function makeResultSection(prefix) {
  return {
    text: qs(prefix + '_text'),
    json: qs(prefix + '_json'),
    status: qs(prefix + '_status'),
  };
}

async function runPrompt(prefix) {
  const prompt = qs(prefix + '_prompt').value;
  const model = qs(prefix + '_model').value;
  const results = makeResultSection(prefix);
  results.status.textContent = 'Running...';
  results.text.textContent = '';
  results.json.textContent = '';

  try {
    const resp = await window.api.complete({ prompt, model, params: {} });
    if (!resp.ok) throw new Error(resp.error || 'Unknown error');
    const data = resp.data;
    const primary = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
      (data.choices && data.choices[0] && data.choices[0].message) || '';
    results.text.textContent = primary;
    results.json.textContent = JSON.stringify(data, null, 2);
    results.status.textContent = 'OK';
  } catch (err) {
    results.status.textContent = 'Error';
    results.text.textContent = err.message || String(err);
    results.json.textContent = '';
  }
}

function wireControls() {
  qs('runA').addEventListener('click', () => runPrompt('a'));
  qs('runB').addEventListener('click', () => runPrompt('b'));
  qs('runBoth').addEventListener('click', async () => {
    qs('runBoth').disabled = true;
    await Promise.all([runPrompt('a'), runPrompt('b')]);
    qs('runBoth').disabled = false;
  });
  qs('clearAll').addEventListener('click', () => {
    ['a', 'b'].forEach((p) => {
      qs(p + '_prompt').value = '';
      qs(p + '_text').textContent = '';
      qs(p + '_json').textContent = '';
      qs(p + '_status').textContent = '';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  wireControls();
});
