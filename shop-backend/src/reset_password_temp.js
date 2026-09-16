import { initDatabase } from './libs/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

async function main() {
    try {
        await initDatabase();
        const user = await User.findOne({ where: { username: 'anh1234' } });
        if (!user) {
            console.log('Không tìm thấy tài khoản anh1234!');
            process.exit(1);
        }
        const hash = await bcrypt.hash('123456', 10);
        user.passwordHash = hash;
        await user.save();
        console.log('✅ Đã cập nhật mật khẩu của tài khoản anh1234 thành: 123456');
        process.exit(0);
    } catch (err) {
        console.error('Lỗi khi cập nhật mật khẩu:', err);
        process.exit(1);
    }
}
main();
