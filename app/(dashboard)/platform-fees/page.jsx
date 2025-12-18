"use client";

import { useEffect, useState } from "react";

export default function PlatformFees() {
  const [fees, setFees] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      const res = await fetch("/api/platform-fees");
      const data = await res.json();
      setFees(data.platformFees);
      setLoading(false);
    };

    fetchFees();
  }, []);

  if (loading) return <p>Loading platform fees...</p>;

  return (
    <div className="p-6 rounded-xl bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">
        💰 Platform Fees
      </h2>

      <p className="text-3xl font-bold text-green-600">
        ₹ {fees}
      </p>
    </div>
  );
}
