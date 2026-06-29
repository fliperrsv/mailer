export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  const BOT_TOKEN = '8998426919:AAEaAux8pCZGepC1XcbBkwqhFVP1zL3F4dk';
  const CHAT_ID = '1057875104';
  const text = `🔔 Новая заявка с портфолио!\n\n👤 Имя: ${name}\n📧 Email: ${email}\n📝 Сообщение: ${message}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}
