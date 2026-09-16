import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initDatabase, sequelize } from './libs/db.js';
import './models/index.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5002;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, '../../images')));

app.use(routes);
app.use(errorHandler);
app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint không tồn tại.' }));

const seedData = async () => {
    const { User, Product } = await import('./models/index.js');
    const bcrypt = (await import('bcryptjs')).default;

    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
        const hash = await bcrypt.hash('admin123', 10);
        await User.create({
            username: 'admin', email: 'admin@candycore.com',
            fullName: 'Admin Candycore', passwordHash: hash,
            role: 'ADMIN', status: 'ACTIVE'
        });
        console.log('✅ Admin account created  (admin / admin123)');
    }

    const count = await Product.count();
    if (count === 0) {
        await Product.bulkCreate([
            { productName: 'Hello Kitty Plush 30cm', description: 'Gấu bông Hello Kitty siêu mềm, size 30cm', price: 299000, originalPrice: 350000, category: 'plush', character: 'Hello Kitty', stock: 50, imageUrl: 'images/Hello Kitty Plush 30cm.jpg' },
            { productName: 'Kuromi Backpack', description: 'Balo Kuromi đi học cực xinh', price: 450000, originalPrice: 500000, category: 'accessories', character: 'Kuromi', stock: 30, imageUrl: 'images/Kuromi Backpack.jpg' },
            { productName: 'Cinnamoroll Notebook Set', description: 'Set 3 cuốn sổ tay Cinnamoroll', price: 120000, category: 'stationery', character: 'Cinnamoroll', stock: 100, imageUrl: 'images/Cinnamoroll Notebook Set.jpg' },
            { productName: 'My Melody Hoodie', description: 'Áo hoodie My Melody màu hồng pastel', price: 380000, originalPrice: 420000, category: 'apparel', character: 'My Melody', stock: 25, imageUrl: 'images/My Melody Hoodie.jpg' },
            { productName: 'Pompompurin Mug', description: 'Cốc sứ Pompompurin 350ml', price: 180000, category: 'homeware', character: 'Pompompurin', stock: 60, imageUrl: 'images/Pompompurin Mug.jpg' },
            { productName: 'Little Twin Stars Keychain', description: 'Móc khóa Little Twin Stars kim tuyến', price: 85000, category: 'accessories', character: 'Little Twin Stars', stock: 200, imageUrl: 'images/Little Twin Stars Keychain.jpg' },
            { productName: 'Keroppi Plush 20cm', description: 'Gấu bông ếch Keroppi dễ thương', price: 220000, originalPrice: 250000, category: 'plush', character: 'Keroppi', stock: 45, imageUrl: 'images/Keroppi Plush 20cm.jpg' },
            { productName: 'Badtz-Maru Sticker Pack', description: 'Pack 50 sticker Badtz-Maru', price: 65000, category: 'stationery', character: 'Badtz-Maru', stock: 150, imageUrl: 'images/Badtz-Maru Sticker Pack.jpg' },
            { productName: 'Pochacco Canvas Tote Bag', description: 'Túi vải canvas Pochacco đi học cực xinh và tiện lợi', price: 190000, originalPrice: 220000, category: 'accessories', character: 'Pochacco', stock: 40, imageUrl: 'images/Pochacco Canvas Tote Bag.jpg' },
            { productName: 'Kuromi Gothic Lolita Dress', description: 'Váy Kuromi phong cách Gothic Lolita cá tính', price: 620000, originalPrice: 700000, category: 'apparel', character: 'Kuromi', stock: 15, imageUrl: 'images/Kuromi Gothic Lolita Dress.jpg' },
            { productName: 'Cinnamoroll Wireless Earbuds', description: 'Tai nghe Bluetooth không dây Cinnamoroll màu xanh pastel cực cute', price: 550000, category: 'accessories', character: 'Cinnamoroll', stock: 20, imageUrl: 'images/Cinnamoroll Wireless Earbuds.jpg' },
            { productName: 'My Melody Ceramic Teapot', description: 'Bình trà sứ My Melody cao cấp để bàn trà ngọt ngào', price: 320000, originalPrice: 380000, category: 'homeware', character: 'My Melody', stock: 12, imageUrl: 'images/My Melody Ceramic Teapot.jpg' },
            { productName: 'Keroppi Kids Raincoat', description: 'Áo mưa Keroppi chống nước họa tiết chú ếch xanh cho bé', price: 150000, category: 'apparel', character: 'Keroppi', stock: 35, imageUrl: 'images/Keroppi Kids Raincoat.jpg' },
            { productName: 'Badtz-Maru Gaming Mousepad', description: 'Bàn di chuột gaming Badtz-Maru bản to dày dặn chống trượt', price: 250000, category: 'stationery', character: 'Badtz-Maru', stock: 30, imageUrl: 'images/Badtz-Maru Gaming Mousepad.jpg' },
            { productName: 'Hello Kitty Pink Thermo Flask', description: 'Bình nước giữ nhiệt Hello Kitty màu hồng giữ nhiệt 12 tiếng', price: 290000, originalPrice: 340000, category: 'homeware', character: 'Hello Kitty', stock: 45, imageUrl: 'images/Hello Kitty Pink Thermo Flask.jpg' }
        ]);
        console.log('✅ Sample products seeded (15 sản phẩm)');
    }
};

const start = async () => {
    try {
        await initDatabase();
        await sequelize.sync({ alter: false, force: false });
        console.log('✅ Tables ready');
        await seedData();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Candycore Shop Backend chạy trên cổng ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Lỗi khởi động:', err.message);
        process.exit(1);
    }
};

start();