// // backend/server.js

// const express = require('express');
// const cors = require('cors');
// const { Employee } = require('./models'); // Đảm bảo rằng bạn đã import model Employee đúng

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // Route API để lấy danh sách nhân viên
// app.get('/api/employees', async (req, res) => {
//   try {
//     const employees = await Employee.findAll(); // Lấy tất cả nhân viên từ cơ sở dữ liệu
//     res.json(employees); // Trả về dữ liệu dưới dạng JSON
//   } catch (error) {
//     console.error("Error fetching employees:", error); // Log lỗi để dễ debug
//     res.status(500).send('Lỗi khi lấy dữ liệu nhân viên');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Kết nối database
const Employee = require('./models/Employee'); // Model Employee


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Staff Management API!');
});

app.get('/employees', async (req, res) => {
  try {
      const employees = await Employee.findAll();
      res.json(employees); // Trả về danh sách nhân viên ở dạng JSON
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});




// Kiểm tra kết nối database
sequelize.authenticate()
  .then(() => {
    console.log('Kết nối cơ sở dữ liệu thành công!');
    app.listen(port, () => {
      console.log(`Server đang chạy tại http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Không thể kết nối cơ sở dữ liệu:', err);
  });