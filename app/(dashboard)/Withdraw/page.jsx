"use client";

import { useState } from "react";
import WithdrawHeader from "./components/WithdrawHeader";
import WithdrawFilters from "./components/WithdrawFilters";
import WithdrawTable from "./components/WithdrawTable";
import WithdrawTableSkeleton from "./components/WithdrawTableSkeleton";
import { useWithdrawRequests } from "./components/useWithdrawRequests";

export default function WithdrawPage() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    fromDate: "",
    toDate: "",
  });

  const { requests, loading, updateStatus } =
    useWithdrawRequests(filters);

  return (
    <div className="p-6 space-y-6">
      <WithdrawHeader />

      <WithdrawFilters
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? (
        <WithdrawTableSkeleton />
      ) : (
        <WithdrawTable
          requests={requests}
          updateStatus={updateStatus}
        />
      )}
    </div>
  );
}
