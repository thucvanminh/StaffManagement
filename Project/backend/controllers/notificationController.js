const prisma = require('../prisma');

// 📌 1. Gửi thông báo
exports.createNotification = async (req, res) => {
    try {
        const { requestID, requestType, recipientID, message } = req.body;

        const notification = await prisma.notifications.create({
            data: {
                requestID,
                requestType,
                recipientID,
                message,
                sentAt: new Date(),
            },
        });

        return res.status(201).json({ message: "Notification created successfully", notification });
    } catch (error) {
        console.error("Error creating notification:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
// tạo function để tận dụng lại
exports.sendNotification = async (requestID, requestType, recipientID, message) => {
    try {
        const notification = await prisma.notifications.create({
            data: {
                requestID,
                requestType,
                recipientID,
                message,
                sentAt: new Date(),
            },
        });
        return notification;
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};


// 📌 2. Lấy danh sách thông báo của nhân viên
exports.getNotificationsByEmployee = async (req, res) => {
    try {
        const employeeID = req.user.employeeID; // Lấy từ token

        const notifications = await prisma.notifications.findMany({
            where: { recipientID: employeeID },
            orderBy: { sentAt: 'desc' },
        });

        return res.status(200).json({ notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// 📌 3. Xóa thông báo
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await prisma.notifications.findUnique({
            where: { notificationID: parseInt(id) },
        });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        await prisma.notifications.delete({
            where: { notificationID: parseInt(id) },
        });

        return res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.error("Error deleting notification:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

