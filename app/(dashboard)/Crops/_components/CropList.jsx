"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function CropList() {
  const [crops, setCrops] = useState([]);
  const [editingCrop, setEditingCrop] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch crops + seller info
  const fetchCrops = async () => {
    const { data, error } = await supabase
      .from("crops")
      .select(`
        *,
        seller:users (
          full_name,
          role,
          phone,
          location
        )
      `)
      .order("created_at", { ascending: false });

    if (!error) setCrops(data);
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const deleteCrop = async (id) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("crops").delete().eq("id", id);
    fetchCrops();
  };

  const updateCrop = async () => {
    setLoading(true);

    const { id, name, price_per_kg, available_quantity, quality } = editingCrop;

    await supabase
      .from("crops")
      .update({
        name,
        price_per_kg,
        available_quantity,
        quality,
      })
      .eq("id", id);

    setLoading(false);
    setEditingCrop(null);
    fetchCrops();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">

      <h2 className="text-xl font-bold mb-4">All Crops</h2>

      <div className="space-y-4">
        {crops.length === 0 && <p>No crops added yet.</p>}

        {crops.map((crop) => (
          <div key={crop.id} className="p-4 bg-white shadow border rounded-lg">
            {/* EDIT MODE */}
            {editingCrop?.id === crop.id ? (
              <div className="space-y-3">

                <input
                  type="text"
                  value={editingCrop.name}
                  onChange={(e) =>
                    setEditingCrop({ ...editingCrop, name: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />

                <input
                  type="number"
                  value={editingCrop.price_per_kg}
                  onChange={(e) =>
                    setEditingCrop({
                      ...editingCrop,
                      price_per_kg: Number(e.target.value),
                    })
                  }
                  className="border p-2 w-full rounded"
                />

                <input
                  type="number"
                  value={editingCrop.available_quantity}
                  onChange={(e) =>
                    setEditingCrop({
                      ...editingCrop,
                      available_quantity: Number(e.target.value),
                    })
                  }
                  className="border p-2 w-full rounded"
                />

                <input
                  type="text"
                  value={editingCrop.quality}
                  onChange={(e) =>
                    setEditingCrop({ ...editingCrop, quality: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />

                <div className="flex gap-2">
                  <button
                    onClick={updateCrop}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={() => setEditingCrop(null)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            ) : (
              /* VIEW MODE */
              <div>
                <p><strong>Seller Name:</strong> {crop.seller?.full_name || "Unknown"}</p>
                <p><strong>Seller Role:</strong> {crop.seller?.role}</p>
                <p><strong>Phone:</strong> {crop.seller?.phone}</p>
                <p><strong>Location:</strong> {crop.seller?.location}</p>

                <hr className="my-3" />

                <p><strong>Crop:</strong> {crop.name}</p>
                <p><strong>Quality:</strong> {crop.quality}</p>
                <p><strong>Price:</strong> ₹{crop.price_per_kg}</p>
                <p><strong>Available:</strong> {crop.available_quantity}</p>

                {crop.image_urls?.length > 0 && (
                  <div className="flex gap-3 mt-3 overflow-x-auto">
                    {crop.image_urls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        className="w-32 h-32 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => setEditingCrop(crop)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCrop(crop.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}