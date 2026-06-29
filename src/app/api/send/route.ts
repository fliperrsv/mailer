import { NextResponse } from "next/server";

const BOT_TOKEN = "8834292287:AAF1Z5Aw-ublX3QEDP5_R7EVP-dgEHyz8Dg"; // токен от @BotFather
const CHAT_ID = "1057875104";       // твой Telegram ID (от @userinfobot)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }

    const text = `🔔 Новая заявка с портфолио!\n\n👤 Имя: ${name}\n📧 Email: ${email}\n📝 Сообщение: ${message}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
