// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabase/client";
// import { toast } from "sonner";

// export default function VirtualCropsAdminPage() {
//   const [crops, setCrops] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [newPrice, setNewPrice] = useState("");

//   const fetchCrops = async () => {
//     const { data, error } = await supabase
//       .from("virtual_crops")
//       .select("*")
//       .order("created_at", { ascending: true });

//     if (error) {
//       toast.error("Failed to load crops");
//       return;
//     }

//     setCrops(data);
//   };

//   useEffect(() => {
//     fetchCrops();
//   }, []);

//   const updatePrice = async (crop) => {
//     const oldPrice = crop.current_price;
//     const price = Number(newPrice);

//     if (!price || price <= 0) {
//       toast.error("Enter valid price");
//       return;
//     }

//     const percentChange =
//       ((price - oldPrice) / oldPrice) * 100;

//     const { error } = await supabase
//       .from("virtual_crops")
//       .update({
//         current_price: price,
//         price_change_percent: percentChange.toFixed(2),
//         last_updated: new Date().toISOString(),
//       })
//       .eq("id", crop.id);

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     toast.success("Price updated");
//     setEditingId(null);
//     setNewPrice("");
//     fetchCrops();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Virtual Crops Pricing</h1>

//       <div className="grid gap-4">
//         {crops.map((crop) => (
//           <div
//             key={crop.id}
//             className="border rounded-lg p-4 flex justify-between items-center"
//           >
//             <div>
//               <h2 className="font-semibold text-lg">{crop.name}</h2>
//               <p className="text-sm text-gray-500">{crop.description}</p>

//               <p className="mt-2">
//                 Current Price:{" "}
//                 <span className="font-bold">
//                   ₹{crop.current_price}
//                 </span>
//               </p>

//               <p
//                 className={`text-sm ${
//                   crop.price_change_percent >= 0
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {crop.price_change_percent}% change
//               </p>
//             </div>

//             <div>
//               {editingId === crop.id ? (
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     value={newPrice}
//                     onChange={(e) => setNewPrice(e.target.value)}
//                     className="border px-3 py-1 rounded w-28"
//                     placeholder="New price"
//                   />
//                   <button
//                     onClick={() => updatePrice(crop)}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingId(null)}
//                     className="bg-gray-300 px-3 py-1 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setEditingId(crop.id);
//                     setNewPrice(crop.current_price);
//                   }}
//                   className="bg-black text-white px-4 py-2 rounded"
//                 >
//                   Edit Price
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//         {crops.length === 0 && (
//           <p className="text-center text-gray-500">
//             No virtual crops found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }





"use client";

import { useVirtualCrops } from "./components/useVirtualCrops";
import VirtualCropList from "./components/VirtualCropList";
import VirtualCropSkeleton from "./components/VirtualCropSkeleton";

export default function VirtualCropsAdminPage() {
  const cropState = useVirtualCrops();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Virtual Crop Pricing
      </h1>

      {cropState.loading ? (
        <VirtualCropSkeleton />
      ) : (
        <VirtualCropList {...cropState} />
      )}
    </div>
  );
}
