// backend/server.js
const app = require('./app'); // Import cấu hình từ app.js
const pool = require('./config/database'); // Kết nối database

const port = 5000;

// Kiểm tra kết nối database và khởi động server
async function startServer() {
    try {
        // Kiểm tra kết nối
        await pool.getConnection();
        console.log('Database connection successful!');
        
        // Khởi động server
        app.listen(port, () => {
            console.log(`Server đang chạy tại http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Cannot connect to the database:', error);
        process.exit(1);
    }
}

startServer();


