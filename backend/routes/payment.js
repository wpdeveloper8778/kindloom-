const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const PAYPAL_API = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || 'PayPal auth failed');
  return data.access_token;
}

router.post('/create-paypal-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const token = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount.toFixed(2),
          },
        }],
      }),
    });

    const order = await response.json();
    if (!response.ok) throw new Error(order.message || 'PayPal order creation failed');

    res.json({ orderID: order.id });
  } catch (error) {
    console.error('PayPal create error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/capture-paypal-order', async (req, res) => {
  try {
    const { orderID, orderData } = req.body;
    const token = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const capture = await response.json();
    if (!response.ok) throw new Error(capture.message || 'PayPal capture failed');

    if (capture.status !== 'COMPLETED') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    const paymentResult = {
      paypalOrderId: capture.id,
      paypalPayerId: capture.payer?.payer_id,
      paypalStatus: capture.status,
      paypalEmail: capture.payer?.email_address,
      captureId: capture.purchase_units?.[0]?.payments?.captures?.[0]?.id,
    };

    const order = await Order.create({
      ...orderData,
      paymentMethod: 'paypal',
      paymentResult,
      status: 'confirmed',
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
