import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: "fliperrsv@yandex.ru",
        pass: process.env.YANDEX_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "fliperrsv@yandex.ru",
      to: "fliperrsv@yandex.ru",
      subject: `Новая заявка с портфолио от ${name}`,
      text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
      html: `<b>Имя:</b> ${name}<br><b>Email:</b> ${email}<br><b>Сообщение:</b> ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
