const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, disconnectDB } = require('./config/db');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/payments', require('./routes/payment'));
app.use('/api/upload', require('./routes/upload'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  const Product = require('./models/Product');
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log('Seeding database with sample products...');
    try {
      await Product.insertMany(require('./seeds/data').products);
      console.log('Seeding complete');
    } catch (err) {
      console.error('Seeding failed:', err.message);
    }
  }

  app.listen(PORT, () => console.log(`TeeSpace API running on http://localhost:${PORT}`));
}

process.on('SIGINT', async () => { await disconnectDB(); process.exit(); });
process.on('SIGTERM', async () => { await disconnectDB(); process.exit(); });

start();
