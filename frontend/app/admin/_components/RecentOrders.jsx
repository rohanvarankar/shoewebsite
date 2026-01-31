export default function RecentOrders({ orders = [] }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">Recent Orders</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th>User</th>
            <th>Amount</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b">
              <td>{o.user?.name || "Guest"}</td>
              <td>₹{o.totalPrice}</td>
              <td>{o.isPaid ? "Paid" : "Unpaid"}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
