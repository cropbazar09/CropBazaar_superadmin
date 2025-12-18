import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("users")
    .select("wallet_balance")
    .eq("role", "admin")
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    platformFees: data.wallet_balance
  });
}
