// backend/server.js
const app = require('./app'); // Import cấu hình từ app.js
const sequelize = require('./config/database'); // Kết nối database
require('./models/association'); // Thiết lập associations trước khi chạy ứng dụng

const port = 5000;

// Kiểm tra kết nối database và khởi động server
sequelize.authenticate()
  .then(() => {
    console.log('Kết nối cơ sở dữ liệu thành công!');
    app.listen(port, () => {
      console.log(`Server đang chạy tại http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Không thể kết nối cơ sở dữ liệu:', err);
    process.exit(1); // Thoát chương trình nếu không kết nối được database
  });


