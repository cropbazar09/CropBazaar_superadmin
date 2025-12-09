"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RoleTabs() {
  const roles = ["farmer", "distributor", "retailer", "customer"];
  const [selected, setSelected] = useState("farmer");
  const [users, setUsers] = useState([]);

  // Fetch users by role
  const fetchUsers = async (role) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", role);

    if (error) {
      console.log("Error:", error);
    } else {
      setUsers(data);
    }
  };

  // Fetch on tab change
  useEffect(() => {
    fetchUsers(selected);
  }, [selected]);

  return (
    <div className="w-full max-w-xl mx-auto">

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelected(role)}
            className={`px-4 py-2 rounded-lg border capitalize
            ${selected === role ? "bg-black text-white" : "bg-gray-100"}`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Display users */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="font-semibold mb-3 capitalize">
          {selected} Users
        </h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-3 bg-white shadow rounded-lg"
              >
                <p><strong>Name:</strong> {user.full_name || "N/A"}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p><strong>Email:</strong> {user.email || "N/A"}</p>
                <p><strong>Location:</strong> {user.location || "N/A"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
