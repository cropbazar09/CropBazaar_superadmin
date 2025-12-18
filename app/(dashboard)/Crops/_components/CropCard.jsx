"use client";

import CropImages from "./CropImages";
import { supabase } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CropCard({ crop, setEditingCrop, fetchCrops }) {
  const deleteCrop = async () => {
    if (!confirm("Are you sure you want to delete this crop?")) return;
    await supabase.from("crops").delete().eq("id", crop.id);
    fetchCrops();
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {crop.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT: Details */}
          <div className="md:col-span-2 space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <p><span className="font-medium">Seller:</span> {crop.seller?.full_name || "Unknown"}</p>
              <p><span className="font-medium">Role:</span> {crop.seller_role}</p>
              <p><span className="font-medium">Phone:</span> {crop.seller?.phone || "-"}</p>
              <p><span className="font-medium">Location:</span> {crop.seller?.location || "-"}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <p><span className="font-medium">Quality:</span> {crop.quality}</p>
              <p><span className="font-medium">Price:</span> ₹{crop.price_per_kg}/kg</p>
              <p><span className="font-medium">Available:</span> {crop.available_quantity}</p>
            </div>
          </div>

          {/* RIGHT: Small width image + buttons */}
          <div className="flex flex-col items-center">
            {/* Image (small width) */}
            <div className="w-40 md:w-44">
              <CropImages images={crop.image_urls} />
            </div>

            {/* Small buttons */}
            <div className="flex gap-2 mt-4 w-40 md:w-44">
              <Button
                size="sm"
                className="w-full"
                onClick={() => setEditingCrop(crop)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="w-full"
                onClick={deleteCrop}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
