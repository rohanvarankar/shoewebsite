export default function DashboardStats({ stats = {} }) {
  const {
    totalRevenue = 0,
    totalOrders = 0,
    totalUsers = 0,
    totalProducts = 0,
  } = stats;

  const cards = [
    { title: "Revenue", value: `₹${totalRevenue}` },
    { title: "Orders", value: totalOrders },
    { title: "Users", value: totalUsers },
    { title: "Products", value: totalProducts },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.title} className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">{c.title}</p>
          <p className="text-2xl font-bold mt-2">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
