const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to remove accents and format email
function toEmail(fullName) {
  return fullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase() + '@gmail.com';
}

// Random date generator
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

// Random phone number generator
function randomPhone() {
  return '09' + Math.floor(10000000 + Math.random() * 90000000);
}

// Sample names and cities
const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đỗ', 'Phan', 'Ngô', 'Bùi','Văn','Lý','Thái','Mỹ','Hồ','Đặng','Đan'];
const middleNames = ['Văn', 'Thị', 'Minh', 'Ngọc', 'Thanh', 'Anh', 'Hồng', 'Phương', 'Quốc', 'Hải','Chí','Hạ','Thăng'];
const lastNames = ['Hùng', 'Lan', 'Tâm', 'Mai', 'Dũng', 'Hạnh', 'Bình', 'Phong', 'Linh', 'Tú','Huy','Ngọc','Phát','Tài','Bảo','Phúc','Đức'];
const cities = ['Hồ Chí Minh', 'Bình Dương', 'Bình Phước', 'Hà Nội', 'Đà Nẵng','Hải Phòng','Nghệ An','Hà Tĩnh','Quảng Bình','Quảng Trị','Quảng Nam','Quảng Ngãi','Quảng Ninh'];

// Generate and add employees
async function addEmployees() {
  try {
    for (let i = 264; i <= 303; i++) {
      const fullName = `${firstNames[Math.floor(Math.random() * 10)]} ${
        middleNames[Math.floor(Math.random() * 10)]
      } ${lastNames[Math.floor(Math.random() * 10)]}`;
      const departmentID = 2 + ((i - 154) % 4); // Cycles 2, 3, 4, 5
      const headOfDepartmentID = [null, null, 102, 103, 104, 105][departmentID]; // Maps to existing heads
      const gender = Math.random() > 0.5 ? 'Male' : 'Female';

      const employee = {
        employeeID: i,
        fullName,
        dateOfBirth: randomDate(new Date(1985, 0, 1), new Date(2000, 0, 1)),
        hireDay: randomDate(new Date(2010, 0, 1), new Date(2024, 0, 1)),
        email: toEmail(fullName),
        phone: randomPhone(),
        address: `${Math.floor(100 + Math.random() * 900)} Đường ${lastNames[Math.floor(Math.random() * 10)]}`,
        city: cities[Math.floor(Math.random() * 5)],
        gender,
        departmentID,
        headOfDepartmentID,
        roleID: 3,
      };

      await prisma.employees.create({
        data: {
          employeeID: employee.employeeID,
          fullName: employee.fullName,
          dateOfBirth: new Date(employee.dateOfBirth),
          hireDay: new Date(employee.hireDay),
          email: employee.email,
          phone: employee.phone,
          address: employee.address,
          city: employee.city,
          gender: employee.gender,
          departmentID: employee.departmentID,
          headOfDepartmentID: employee.headOfDepartmentID,
          roleID: employee.roleID,
        },
      });

      console.log(`Added employee ${i}: ${employee.fullName}`);
    }
    console.log('All 150 employees added successfully.');
  } catch (error) {
    console.error('Error adding employees:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
addEmployees();