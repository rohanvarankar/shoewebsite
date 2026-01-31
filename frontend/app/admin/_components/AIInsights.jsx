export default function AIInsights({ insights }) {
  if (!insights) return null;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">Smart Insights</h3>

      <p>Repeat Customers: {insights.repeatCustomerCount}</p>

      <ul className="list-disc ml-5 mt-2">
        {insights.lowStockProducts.map((p) => (
          <li key={p._id}>
            {p.name} ({p.countInStock} left)
          </li>
        ))}
      </ul>
    </div>
  );
}
