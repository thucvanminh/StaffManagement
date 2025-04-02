
const app = require('./app');
const prisma = require('./prisma');
const { bucket } = require('./config/firebase');


const port = 5000;

async function startServer() {
    try {
        // Kiểm tra kết nối Prisma
        await prisma.$connect();
        console.log('✅ Prisma Database connection successful!');

        // Kiểm tra kết nối Firebase Storage
        if (bucket) {
            console.log('✅ Firebase Storage connected!');
        }

        // Khởi động server
        const server = app.listen(port, () => {
            console.log(`🚀 Server is running at http://localhost:${port}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', async () => {
            console.log('⏳ Shutting down server...');
            server.close(() => {
                console.log('✅ Server has been shut down');
            });
            await prisma.$disconnect();
            console.log('✅ Prisma has been disconnected');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Error when connecting:', error);
        process.exit(1);
    }
}

startServer();