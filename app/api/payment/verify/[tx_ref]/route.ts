// app/api/payment/verify/[tx_ref]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import axios from "axios";

// DO NOT manually type { params: { tx_ref: string } }
// Let Next.js infer it and extract `params` cleanly

export async function GET(
  req: NextRequest,
  context: { params: Record<string, string | string[]> }
) {
  const supabase = await createClient();
  const tx_ref = Array.isArray(context.params.tx_ref)
    ? context.params.tx_ref[0]
    : context.params.tx_ref;

  if (!tx_ref) {
    return NextResponse.json(
      { error: "Missing transaction reference" },
      { status: 400 }
    );
  }

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.CHAPA_AUTH}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      config
    );

    const chapaData = response.data?.data;
    const status = chapaData?.status;

    if (!status) {
      return NextResponse.json(
        { error: "Invalid Chapa response" },
        { status: 500 }
      );
    }

    let paymentStatus: "pending" | "success" | "failed" = "pending";
    if (status === "success") paymentStatus = "success";
    else if (status === "failed") paymentStatus = "failed";

    const { error: updateError } = await supabase
      .from("transactions")
      .update({ status: paymentStatus })
      .eq("chapa_tx_ref", tx_ref);

    if (updateError) {
      console.error("Update Error:", updateError.message);
      return NextResponse.json(
        { error: "Failed to update transaction" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Payment verified", status: paymentStatus },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chapa Verification Error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
