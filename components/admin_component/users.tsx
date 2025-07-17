"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type User = {
  id: string;
  full_name: string | null;
  phone: string | null;
  sponsor: string | null;
  invite_link: string | null;
  invites: any;
  role: string | null;
  email: string | null;
};

export default function CurrentUsers() {
  const supabase = createClient();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const updateRole = async (id: string, newRole: "admin" | "user") => {
    const confirm = window.confirm(
      `Are you sure you want to ${newRole === "admin" ? "promote to Admin" : "demote to User"}?`
    );

    if (!confirm) return;

    const { error } = await supabase
      .from("users")
      .update({ role: newRole })
      .eq("id", id);

    if (error) {
      alert("Failed to update role");
      console.error(error);
    } else {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">✅ Current Users List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Sponsor</th>
                <th className="p-3 border">Invite Link</th>
                <th className="p-3 border">Invites</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border">{user.full_name || "-"}</td>
                  <td className="p-3 border">{user.email || "-"}</td>
                  <td className="p-3 border">{user.phone || "-"}</td>
                  <td className="p-3 border">{user.sponsor || "-"}</td>
                  <td className="p-3 border break-words max-w-[150px]">
                    {user.invite_link || "-"}
                  </td>
                  <td className="p-3 border max-w-[200px]">
                    <pre className="whitespace-pre-wrap break-words">
                      {JSON.stringify(user.invites, null, 2)}
                    </pre>
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="p-3 border space-x-2">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => updateRole(user.id, "admin")}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                      >
                        Promote
                      </button>
                    ) : (
                      <button
                        onClick={() => updateRole(user.id, "user")}
                        className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs"
                      >
                        Demote
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
