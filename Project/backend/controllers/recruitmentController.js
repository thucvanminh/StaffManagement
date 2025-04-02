// backend/controllers/recruitmentController.js

const { bucket } = require('../config/firebase');
const prisma = require('../prisma');
const multer = require('multer');
const path = require('path');
const StatusEnum = require('../enum/StatusEnum');

// Cấu hình Multer lưu file vào bộ nhớ tạm thời
const storage = multer.memoryStorage();
const uploadToFireBase = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn 2MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed'), false);
        }
    cb(null, true);
    }
});

// 📝 Hàm upload CV và tạo đơn xin việc
const submitRecruitmentRequest = async (req, res) => {
    let file;
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload your CV (PDF)' });
        }
        if (path.extname(req.file.originalname).toLowerCase() !== '.pdf') {
            return res.status(400).json({ message: 'Only PDF files are accepted' });
        }

        const fileName = `resumes/Applicant_${req.body.applicantName}_${req.body.applicantEmail}.pdf`;
        file = bucket.file(fileName);

        // Lưu file lên Firebase Storage
        await file.save(req.file.buffer, {
            metadata: { contentType: req.file.mimetype },
        });

        // Đặt file thành công khai
        await file.makePublic();

        // Lấy URL công khai
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        console.log('Public URL:', publicUrl);

        // Lưu vào database
        const newRecruitmentRequest = await prisma.recruitment_requests.create({
            data: {
                applicantName: req.body.applicantName,
                applicantEmail: req.body.applicantEmail,
                position: req.body.position,
                coverLetter: req.body.coverLetter,
                gender: req.body.gender,
                applicantPhone: req.body.applicantPhone,
                resumeLink: publicUrl,
                statusID: StatusEnum.PENDING,
            },
        });

        return res.status(201).json({
            message: 'Recruitment request submitted successfully!',
            resumeLink: publicUrl,
            data: newRecruitmentRequest,
        });
    } catch (error) {
        console.error('🚨 Error when processing recruitment request:', error);
        if (file) await file.delete();
        return res.status(500).json({ message: 'System error' });
    }
};

// 📂 Hàm lấy danh sách đơn xin việc
const getAllRecruitmentRequests = async (req, res) => {
    try {
        const recruitmentRequests = await prisma.recruitment_requests.findMany();
        return res.status(200).json({
            message: 'Lấy danh sách đơn xin việc thành công!',
            data: recruitmentRequests,
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn xin việc:', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};

// ❌ Hàm xóa đơn xin việc
const deleteRecruitmentRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const recruitmentRequest = await prisma.recruitment_requests.findUnique({
            where: { recruitmentRequestID: parseInt(id) },
        });

        if (!recruitmentRequest) {
            return res.status(404).json({ message: 'Không tìm thấy đơn xin việc' });
        }

        // Xóa file CV trên Firebase
        const fileName = recruitmentRequest.resumeLink.split('/').pop();
        const file = bucket.file(`resumes/${fileName}`);
        await file.delete();

        // Xóa bản ghi trong database
        await prisma.recruitment_requests.delete({
            where: { recruitmentRequestID: parseInt(id) },
        });

        return res.status(200).json({ message: 'Xóa đơn xin việc thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa đơn xin việc:', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};

// 🔄 Hàm cập nhật đơn xin việc
const updateRecruitmentRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedRecruitmentRequest = await prisma.recruitment_requests.update({
            where: { recruitmentRequestID: parseInt(id) },
            data: updatedData,
        });

        return res.status(200).json({
            message: 'Cập nhật đơn xin việc thành công!',
            data: updatedRecruitmentRequest,
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật đơn xin việc:', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};

// 🏗️ Xuất controller
module.exports = { uploadToFireBase, submitRecruitmentRequest, getAllRecruitmentRequests, deleteRecruitmentRequest, updateRecruitmentRequest };