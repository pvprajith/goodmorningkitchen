// pages/api/bulk-order.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body;
    // TODO: integrate email/DB/Sheets here (we're only logging for now)
    console.log("Bulk order request received:", JSON.stringify(payload, null, 2));

    // You can return a friendly message for the UI
    return res.status(200).json({ ok: true, message: "Bulk order request received. We will contact you shortly." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
