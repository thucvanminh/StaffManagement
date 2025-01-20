// backend/server.js

const express = require('express');
const cors = require('cors');
const { Employee } = require('./models'); // Đảm bảo rằng bạn đã import model Employee đúng

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Route API để lấy danh sách nhân viên
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll(); // Lấy tất cả nhân viên từ cơ sở dữ liệu
    res.json(employees); // Trả về dữ liệu dưới dạng JSON
  } catch (error) {
    console.error("Error fetching employees:", error); // Log lỗi để dễ debug
    res.status(500).send('Lỗi khi lấy dữ liệu nhân viên');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
