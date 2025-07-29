// app/api/payment/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosError } from 'axios';

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { service_name, service_category, amount } = body;

  if (!service_name || !service_category || !amount) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tx_ref = `tx-${Date.now()}-${uuidv4()}`;
    const CALLBACK_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/verify/${tx_ref}`;

    const chapaPayload = {
      amount,
      currency: 'ETB',
      email: user.email,
      first_name: user.user_metadata?.first_name || 'User',
      last_name: user.user_metadata?.last_name || 'Anonymous',
      tx_ref,
      callback_url: CALLBACK_URL,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_AUTH}`,
        'Content-Type': 'application/json',
      },
    };

    const chapaRes = await axios.post(
      process.env.CHAPA_URL_TRANSACTION_INITIALIZE!,
      chapaPayload,
      config
    );

    const { status, data } = chapaRes.data;

    if (status !== 'success' || !data?.checkout_url) {
      return NextResponse.json({ error: 'Chapa failed to generate checkout URL' }, { status: 500 });
    }

    // Save transaction in Supabase
    const { error: dbError } = await supabase.from('transactions').insert([
      {
        user_id: user.id,
        service_name,
        service_category,
        amount,
        status: 'pending',
        state: 'pending',
        chapa_tx_ref: tx_ref,
        receipt_url: data.checkout_url,
      },
    ]);

    if (dbError) {
      console.error('Supabase Insert Error:', dbError.message);
      return NextResponse.json({ error: 'Failed to record transaction' }, { status: 500 });
    }

    return NextResponse.json({ checkout_url: data.checkout_url }, { status: 200 });
  } catch (err) {
    const error = err as AxiosError;
    console.error('Chapa Init Error:', error.message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
