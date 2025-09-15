// pages/api/bulk-order.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    productId, productName, kg, total, company, contactPerson, phone, email, address, notes
  } = req.body || {};

  if (!company || !phone || !kg) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const body = `
Bulk Order Request
------------------
Product: ${productName} (${productId})
Quantity: ${kg} kg
Estimated Total: ₹${total}

Company: ${company}
Contact Person: ${contactPerson}
Phone: ${phone}
Email: ${email}
Address: ${address}

Notes:
${notes}
`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const salesTo = process.env.SALES_EMAIL || "sales@goodmorningkitchen.com";

    await transporter.sendMail({
      from: `"Good Morning Kitchen" <${process.env.SMTP_USER}>`,
      to: salesTo,
      subject: `Bulk Order Request — ${company} — ${kg}kg`,
      text: body,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("bulk-order error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
