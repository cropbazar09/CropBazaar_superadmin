"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";

export function useVirtualCrops() {
  const [crops, setCrops] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCrops = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("virtual_crops")
      .select("*")
      .order("created_at", { ascending: true });

    setLoading(false);

    if (error) {
      toast.error("Failed to load crops");
      return;
    }

    setCrops(data);
  };

  const updatePrice = async (crop) => {
    const oldPrice = crop.current_price;
    const price = Number(newPrice);

    if (!price || price <= 0) {
      toast.error("Enter valid price");
      return;
    }

    const percentChange = ((price - oldPrice) / oldPrice) * 100;

    const { error } = await supabase
      .from("virtual_crops")
      .update({
        current_price: price,
        price_change_percent: percentChange.toFixed(2),
        last_updated: new Date().toISOString(),
      })
      .eq("id", crop.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Price updated");
    setEditingId(null);
    setNewPrice("");
    fetchCrops();
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  return {
    crops,
    loading,
    editingId,
    setEditingId,
    newPrice,
    setNewPrice,
    updatePrice,
  };
}
