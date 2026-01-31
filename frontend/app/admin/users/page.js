"use client";

import { useEffect, useState } from "react";
import PageHeader from "../_components/PageHeader";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setUsers(data.users || []);
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <PageHeader title="Users" />

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* MOBILE HINT */}
        <div className="sm:hidden px-4 py-2 text-xs text-gray-500">
          Swipe horizontally to view more →
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full border-collapse">
            {/* TABLE HEAD */}
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Orders
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}

              {users.map((u, index) => (
                <tr
                  key={u._id}
                  className={`
                    transition
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    hover:bg-indigo-50
                  `}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {u.name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {u.email}
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {u.orderCount}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`
                        inline-flex items-center px-3 py-1 rounded-full
                        text-xs font-semibold
                        ${
                          u.isBlocked
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
