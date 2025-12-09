"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("id, email") 
      .order("id", { ascending: true });

    if (error) {
      toast.error("Error loading team members");
      return;
    }

    setTeams(data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);


  const addTeamUser = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("teams").insert([{ email }]); 

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Team member added successfully");
    setEmail("");
    fetchTeams();
  };

  // Delete team user
  const deleteTeamUser = async (id) => {
    const { error } = await supabase.from("teams").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Deleted successfully");
    fetchTeams();
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Team Members</h1>

      {/* Add Section */}
      <div className="mb-6 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Add New Team User</h2>

        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={addTeamUser}
            disabled={loading}
            className="bg-black text-white px-4 rounded"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Team List</h2>

        {teams.length === 0 ? (
          <p>No team members yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {teams.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">{t.email}</td>

                  <td className="p-2">
                    <button
                      onClick={() => deleteTeamUser(t.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
