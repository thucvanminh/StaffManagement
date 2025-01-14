
USE StaffManagement;

CREATE TABLE Employee (
    employeeID INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255),
    dateOfBirth DATE,
    hireDay DATE,
    email VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    gender VARCHAR(10),
    departmentID INT,
    headOfDepartmentID INT,
    roleID INT
);

CREATE TABLE Roles (
    roleID INT PRIMARY KEY,
    roleName VARCHAR(255),
    permissions VARCHAR(255)
);

CREATE TABLE Department (
    departmentID INT PRIMARY KEY,
    departmentName VARCHAR(255),
    HeadOfDepartmentID INT
);

CREATE TABLE Admin (
    adminID INT PRIMARY KEY
    -- Add additional fields as necessary
);

CREATE TABLE Status (
    statusID INT PRIMARY KEY,
    statusName VARCHAR(50)
);



ALTER TABLE Employee
ADD CONSTRAINT fk_department
FOREIGN KEY (departmentID) REFERENCES Department(departmentID);

ALTER TABLE Employee
ADD CONSTRAINT fk_headOfDepartment
FOREIGN KEY (headOfDepartmentID) REFERENCES Employee(employeeID);

ALTER TABLE Employee
ADD CONSTRAINT fk_role
FOREIGN KEY (roleID) REFERENCES Roles(roleID);

ALTER TABLE Department
ADD CONSTRAINT fk_headOfDepartmentInDepartment
FOREIGN KEY (HeadOfDepartmentID) REFERENCES Employee(employeeID);








