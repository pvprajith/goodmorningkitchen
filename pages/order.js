export default function Order() {
  return (
    <div className="min-h-screen bg-cream p-6 text-brown">
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
      <form className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow rounded">
        <input type="text" placeholder="Name" className="w-full border p-2 rounded" />
        <input type="tel" placeholder="Phone Number" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Address" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Pincode" className="w-full border p-2 rounded" />

        <select className="w-full border p-2 rounded">
          <option>Cash on Delivery</option>
          <option>UPI (Scan QR)</option>
        </select>

        <button type="submit" className="bg-emerald text-white px-6 py-2 rounded">Submit</button>
      </form>
    </div>
  )
}