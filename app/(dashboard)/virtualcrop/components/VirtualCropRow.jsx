
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function VirtualCropRow({
  crop,
  editingId,
  setEditingId,
  newPrice,
  setNewPrice,
  updatePrice,
}) {
  const isPositive = crop.price_change_percent >= 0;

  return (
    <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-6 py-4">
    
      <div>
        <h2 className="text-lg font-semibold">{crop.name}</h2>
        <p className="text-sm text-muted-foreground">
          {crop.description}
        </p>

        <p className="mt-2 text-sm">
          Current Price:{" "}
          <span className="font-semibold">
            ₹{crop.current_price}
          </span>
        </p>

        <p
          className={`text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {crop.price_change_percent}% change
        </p>
      </div>

      {/* RIGHT */}
      <div>
        {editingId === crop.id ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-28"
              placeholder="New price"
            />

            <Button
              size="sm"
              onClick={() => updatePrice(crop)}
            >
              Save
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setEditingId(crop.id);
              setNewPrice(crop.current_price);
            }}
            className="bg-black text-white hover:bg-black/90"
          >
            Edit Price
          </Button>
        )}
      </div>
    </div>
  );
}
