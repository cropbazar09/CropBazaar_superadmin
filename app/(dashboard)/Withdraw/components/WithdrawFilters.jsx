import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WithdrawFilters({ filters, setFilters }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Input
        placeholder="Search name"
        value={filters.name ?? ""}
        onChange={(e) =>
          setFilters((f) => ({ ...f, name: e.target.value }))
        }
         className="bg-white border-gray-200 focus-visible:ring-black"
      />

      <Input
        placeholder="Search email"
        value={filters.email ?? ""}
        onChange={(e) =>
          setFilters((f) => ({ ...f, email: e.target.value }))
        }
         className="bg-white border-gray-200 focus-visible:ring-black"
      />

      <Input
        type="date"
        value={filters.date ?? ""}
        onChange={(e) =>
          setFilters((f) => ({ ...f, date: e.target.value }))
        }
         className="bg-white border-gray-200 focus-visible:ring-black"
      />

    
      <Button
        onClick={() =>
          setFilters({ name: "", email: "", date: "" })
        }
        className="
          h-9
          w-full
          bg-white
          text-black
          border
          border-gray-200
          rounded-md
          shadow-sm
          hover:bg-gray-100
        "
      >
        Clear
      </Button>
    </div>
  );
}
