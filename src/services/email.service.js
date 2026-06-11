import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const enviarEmailBoasVindas = async (usuario) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: usuario.email,
    subject: "Bem-vindo à HC Store",
    html: `
      <div style="font-family: Arial, sans-serif; background:#111; color:#fff; padding:30px;">
        <h1>Bem-vindo à HC Store, ${usuario.nome}!</h1>

        <p>Sua conta foi criada com sucesso.</p>

        <p>
          Agora você já pode acompanhar nossos lançamentos,
          promoções e drops exclusivos.
        </p>

        <br>

        <a
          href="https://hccstore.com"
          style="
            background:#39ff14;
            color:#000;
            padding:12px 20px;
            text-decoration:none;
            font-weight:bold;
            border-radius:6px;
          "
        >
          ACESSAR HC STORE
        </a>

        <br><br>

        <p>Equipe HC Store</p>
      </div>
    `
  });
};