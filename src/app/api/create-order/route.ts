// src/app/api/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface CreateOrderRequest {
  amount: number;
  currency: string;
  planId: string;
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, planId, userId }: CreateOrderRequest = await request.json();

    // Validate required fields
    if (!amount || !currency || !planId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Razorpay credentials from environment variables
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_SECRET;

    if (!razorpayKeyId || !razorpaySecret) {
      return NextResponse.json(
        { error: 'Razorpay credentials not configured' },
        { status: 500 }
      );
    }

    // Create order payload
    const orderPayload = {
      amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
      currency,
      receipt: `order_${Date.now()}`.slice(0, 40),
      notes: {
        planId,
        userId,
        timestamp: Date.now().toString(),
      },
    };

    // Create authorization header
    const auth = Buffer.from(`${razorpayKeyId}:${razorpaySecret}`).toString('base64');

    // Call Razorpay API to create order
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Razorpay API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to create order', details: errorData },
        { status: response.status }
      );
    }

    const order = await response.json();

    // Return order details to client
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}