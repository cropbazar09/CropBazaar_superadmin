"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function WithdrawTable({ requests, updateStatus }) {
  if (!requests.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No withdraw requests found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>UPI</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests.map((req) => (
          <TableRow key={req.id}>
         
            <TableCell>
              <div className="font-medium">{req.users?.full_name}</div>
              <div className="text-sm text-muted-foreground">
                {req.users?.email}
              </div>
            </TableCell>

            {/* Amount */}
            <TableCell className="font-semibold">
              ₹{req.amount}
            </TableCell>

            {/* UPI */}
            <TableCell>{req.upi_id}</TableCell>

            {/* Status */}
            <TableCell className="capitalize">
              {req.status}
            </TableCell>

            {/* Date */}
            <TableCell className="text-sm text-muted-foreground">
              {new Date(req.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              <div className="text-xs">
                {new Date(req.created_at).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </TableCell>

            {/* Action */}
            <TableCell>
              {req.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateStatus(req.id, "approved")}
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateStatus(req.id, "failed")}
                  >
                    Refund
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
