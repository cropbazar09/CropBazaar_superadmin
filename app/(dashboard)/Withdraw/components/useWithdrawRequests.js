"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

export function useWithdrawRequests(filters) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);

    let query = supabase
      .from("withdraw_requests")
      .select(`
        id,
        amount,
        upi_id,
        status,
        created_at,
        users ( full_name, email )
      `)
      .order("created_at", { ascending: false });

  
    if (filters.name?.trim()) {
      query = query.ilike(
        "users.full_name",
        `%${filters.name}%`
      );
    }

    // ✅ Email filter
    if (filters.email?.trim()) {
      query = query.ilike(
        "users.email",
        `%${filters.email}%`
      );
    }

    // ✅ Single Date filter (FULL DAY)
    if (filters.date) {
      query = query
        .gte("created_at", `${filters.date} 00:00:00`)
        .lte("created_at", `${filters.date} 23:59:59`);
    }

    const { data, error } = await query;

    setLoading(false);

    if (error) {
      toast.error("Failed to load withdraw requests");
      return;
    }

    setRequests(data);
  };

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("withdraw_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Status updated to ${status}`);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  return { requests, loading, updateStatus };
}
