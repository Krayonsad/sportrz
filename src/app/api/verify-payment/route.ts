// src/app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planId: string;
  userId: string;
}

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      userId,
    }: VerifyPaymentRequest = await request.json();

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !planId || !userId) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Get Razorpay secret from environment variables
    const razorpaySecret = process.env.RAZORPAY_SECRET;

    if (!razorpaySecret) {
      return NextResponse.json(
        { error: 'Razorpay secret not configured' },
        { status: 500 }
      );
    }

    // Verify payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Payment signature verification failed' },
        { status: 400 }
      );
    }

    // Fetch payment details from Razorpay to get additional info
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const auth = Buffer.from(`${razorpayKeyId}:${razorpaySecret}`).toString('base64');

    const paymentResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      }
    );

    if (!paymentResponse.ok) {
      console.error('Failed to fetch payment details from Razorpay');
      return NextResponse.json(
        { error: 'Failed to verify payment details' },
        { status: 500 }
      );
    }

    const paymentData = await paymentResponse.json();

    // Check if payment is captured/successful
    if (paymentData.status !== 'captured') {
      return NextResponse.json(
        { error: 'Payment not captured successfully' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save subscription details to your database
    // 2. Update user's subscription status
    // 3. Send confirmation email
    // 4. Update any analytics/tracking

    // For this example, we'll just return success
    // In production, you'd save to your database (Firebase, etc.)
    
    const subscriptionData = {
      userId,
      planId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: paymentData.amount / 100, // Convert back from paise
      currency: paymentData.currency,
      status: 'active',
      startDate: new Date().toISOString(),
      // Calculate end date based on plan (monthly/yearly)
      endDate: new Date(Date.now() + (planId.includes('annual') ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
    };

    // TODO: Save subscriptionData to your database
    console.log('Subscription activated:', subscriptionData);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and subscription activated',
      subscription: subscriptionData,
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}