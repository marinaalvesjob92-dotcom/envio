export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();

  const { p, ua } = req.body || {};
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || '—';

  const txt = [
    '👀 <b>LINK ABERTO</b>',
    p ? `📦 ${p}` : '📦 (sem produto no link)',
    '',
    `🌐 ${ip}`,
    `📱 ${(ua || '').slice(0, 90)}`,
    `🕒 ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text: txt,
      parse_mode: 'HTML',
      disable_notification: true
    })
  }).catch(() => {});

  res.status(200).json({ ok: true });
}
