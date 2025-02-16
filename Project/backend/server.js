// backend/server.js
const app = require('./app'); // Import cấu hình từ app.js
const sequelize = require('./config/database'); // Kết nối database
require('./models/association'); // Thiết lập associations trước khi chạy ứng dụng

const port = 5000;

// Kiểm tra kết nối database và khởi động server
sequelize.sync() // Nếu cần force sync, dùng { force: true } hoặc { alter: true }
  .then(() => {
    console.log('Database has been synchronized!');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('Database connection successful!');
    app.listen(port, () => {
      console.log(`Server đang chạy tại http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Cannot connect to the database:', err);
    process.exit(1); // Thoát chương trình nếu không kết nối được database
  });


