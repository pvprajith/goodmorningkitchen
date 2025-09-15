// pages/api/bulk-order.js
// WhatsApp-only placeholder API for bulk-order requests.
// No nodemailer or SMTP required.

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      productId,
      productName,
      kg,
      unitPrice,
      total,
      company,
      contactPerson,
      phone,
      email,
      address,
      notes,
    } = req.body || {};

    // Basic validation
    if (!company || !phone || !kg) {
      return res.status(400).json({ error: "Missing required fields (company, phone, kg)" });
    }

    // Log to Vercel function logs for future reference
    console.log("Bulk order request:", {
      productId, productName, kg, unitPrice, total, company, contactPerson, phone, email, address, notes
    });

    // Respond success. The client will handle sending user to WhatsApp.
    return res.status(200).json({
      ok: true,
      message: "Bulk order request received. Please complete via WhatsApp or we'll contact you shortly."
    });
  } catch (err) {
    console.error("bulk-order handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
