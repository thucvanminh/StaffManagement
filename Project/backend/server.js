const app = require('./app'); // Import cấu hình từ app.js
const prisma = require('./prisma');
const { bucket } = require('./config/firebase'); // Import Firebase Storage

const port = 5000;

async function startServer() {
    try {
        // Kiểm tra kết nối Prisma
        await prisma.$connect();
        console.log('✅ Prisma Database connection successful!');

        // Kiểm tra kết nối Firebase Storage
        const [files] = await bucket.getFiles();
        console.log(`✅ Firebase Storage connected! Found ${files.length} files.`);

        // Khởi động server
        app.listen(port, () => {
            console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Lỗi khi kết nối:', error);
        process.exit(1);
    }
}

startServer();
