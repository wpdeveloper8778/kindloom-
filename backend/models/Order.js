const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String },
  color: { type: String },
  image: { type: String },
  customization: {
    text: { type: String },
    designUrl: { type: String },
    placement: { type: String, enum: ['front', 'back', 'left-sleeve', 'right-sleeve'] },
  },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  shippingAddress: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'printing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, enum: ['cod', 'card', 'paypal'], default: 'cod' },
  paymentResult: {
    paypalOrderId: { type: String },
    paypalPayerId: { type: String },
    paypalStatus: { type: String },
    paypalEmail: { type: String },
    captureId: { type: String },
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
