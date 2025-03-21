// backend/controllers/recruitmentController.js

const { bucket } = require('../config/firebase');
const prisma = require('../prisma');
const multer = require('multer');
const path = require('path');
const StatusEnum = require('../enum/StatusEnum');



// Cấu hình Multer để lưu file vào bộ nhớ tạm thời
const storage = multer.memoryStorage();
const uploadToFireBase = multer({
    storage: storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // Giới hạn 15MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed'), false);
        }
        cb(null, true);
    }
});

// Hàm xử lý upload CV và tạo đơn xin việc
const submitRecruitmentRequest = async (req, res) => {
    let file;
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload your CV (PDF)' });
        }

        if (path.extname(req.file.originalname).toLowerCase() !== '.pdf') {
            return res.status(400).json({ message: 'Only PDF files are accepted' });
        }

        const fileName = `resumes/Applicant_${req.body.applicantName}_${Date.now()}.pdf`;
        file = bucket.file(fileName);

        await file.save(req.file.buffer, {
            metadata: { contentType: req.file.mimetype },
        });

        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: '03-01-2030',
        });

        const newRecruitmentRequest = await prisma.recruitment_requests.create({
            data: {
                applicantName: req.body.applicantName,
                applicantPhone: req.body.applicantPhone,
                applicantEmail: req.body.applicantEmail,
                position: req.body.position,
                coverLetter: req.body.coverLetter,
                resumeLink: url,
                statusID: StatusEnum.PENDING,
            },
        });

        return res.status(201).json({
            message: 'Recruitment request sent successfully!',
            resumeLink: url,
            data: newRecruitmentRequest,
        });

        

    } catch (error) {
        console.error('🚨 Error when processing recruitment request:', error);
        if (file) await file.delete();
        return res.status(500).json({ message: 'System error' });
    }
};



// Lấy toàn bộ CV từ Firebase Storage
const getAllCVs = async (req, res) => {
    try {
        // Lấy danh sách file trong thư mục "resumes/"
        const [files] = await bucket.getFiles({ prefix: 'resumes/' });

        if (!files.length) {
            return res.status(404).json({ message: 'No CVs found.' });
        }

        // Tạo danh sách URL truy cập CV
        const cvList = await Promise.all(files.map(async (file) => {
            const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-01-2030', // Set ngày hết hạn của URL
            });
            return {
                name: file.name.replace('resumes/', ''), // Bỏ prefix thư mục
                url,
            };
        }));

        return res.status(200).json({
            message: 'CVs retrieved successfully!',
            data: cvList,
        });

    } catch (error) {
        console.error('Error retrieving CVs:', error);
        return res.status(500).json({ message: 'System error' });
    }
};

// Xuất controller
module.exports = { uploadToFireBase, submitRecruitmentRequest, getAllCVs };