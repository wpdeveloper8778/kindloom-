const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', 'One Size', '8x10"', '11x14"', '16x20"', '18x24"', '24x36"', '11oz', '15oz', 'Standard', 'Large', '11x17"', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Pro Max', 'Samsung S25', 'Samsung S25 Ultra'], required: true },
  color: { type: String, required: true },
  colorHex: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 100 },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: { type: String },
  description: { type: String, required: true },
  category: { type: String, enum: ['t-shirts', 'hoodies', 'caps', 'wall-art', 'mugs', 'phone-cases', 'bags', 'posters'], required: true },
  subCategory: { type: String },
  basePrice: { type: Number, required: true },
  images: [{ type: String }],
  variants: [variantSchema],
  colors: [{ name: String, hex: String }],
  sizes: [{ type: String }],
  tags: [String],
  features: [String],
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
