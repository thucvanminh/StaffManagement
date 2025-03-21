const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToFireBase, submitRecruitmentRequest, getAllCVs } = require('../controllers/recruitmentController');
const { validateRecruitmentRequest } = require('../validations/recruitmentValidation');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

const HR_ROLE_ID = 2;
const DIRECTOR_ROLE_ID = 1;

// Cấu hình Multer để xử lý dữ liệu form-data
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 15 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        console.log('📌 File nhận được:', file);
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed'), false);
        }
        cb(null, true);
    }
});


router.use(authenticateToken);

router.post('/',
    authorizeRole([HR_ROLE_ID, DIRECTOR_ROLE_ID]),
    upload.single('resume'), // Xử lý file upload
    validateRecruitmentRequest,
    submitRecruitmentRequest
);

router.get('/', authorizeRole([HR_ROLE_ID, DIRECTOR_ROLE_ID]), getAllCVs);

module.exports = router;
