const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to remove accents and spaces
function toUsername(fullName) {
    return fullName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
}

// Generate and add accounts
async function addAccounts() {
    try {
        for (let employeeID = 154; employeeID <= 282; employeeID++) {
            // Fetch the employee by employeeID
            const employee = await prisma.employees.findUnique({
                where: { employeeID },
            });

            if (!employee) {
                console.log(`Employee ${employeeID} not found, skipping.`);
                continue;
            }

            const username = toUsername(employee.fullName);
            const password = username; // Password matches username

            await prisma.accounts.create({
                data: {
                    username,
                    password,
                    employeeID: employee.employeeID,
                },
            });

            console.log(`Added account for employee ${employeeID}: ${username}`);
        }
        console.log('All accounts added successfully.');
    } catch (error) {
        console.error('Error adding accounts:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Run the script
addAccounts();