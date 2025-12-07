const axios = require('axios');

const OPENAI_KEY = process.env.OPENAI_API_KEY || '';

async function complete({ prompt, model = 'gpt-3.5-turbo', params = {} }) {
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY environment variable is required');

  const body = {
    model,
    messages: [{ role: 'user', content: prompt }],
    ...params,
  };

  const res = await axios.post('https://api.openai.com/v1/chat/completions', body, {
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    timeout: 20000,
  });

  const out = res.data;

  return {
    id: out.id,
    model: out.model,
    choices: (out.choices || []).map((c) => ({
      index: c.index,
      message: c.message || c.delta || c,
      finish_reason: c.finish_reason,
    })),
    usage: out.usage || null,
    raw: out,
  };
}

module.exports = { complete };
