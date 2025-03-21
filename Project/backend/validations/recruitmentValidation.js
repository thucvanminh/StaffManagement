// backend/validations/recruitmentValidation.js

const Joi = require('joi');

// Schema validation cho submit recruitment request
const submitRecruitmentSchema = Joi.object({
    applicantName: Joi.string().required().min(2).max(50),
    applicantPhone: Joi.string().required().pattern(/^[0-9]{10,15}$/),
    applicantEmail: Joi.string().email().required(),
    position: Joi.string().required().min(2).max(50),
    coverLetter: Joi.string().allow('').optional(),
});

const validateRecruitmentRequest = (req, res, next) => {
    // Chuyển đổi từ form-data sang JSON nếu cần
    req.body = {
        applicantName: req.body.applicantName,
        applicantPhone: req.body.applicantPhone,
        applicantEmail: req.body.applicantEmail,
        position: req.body.position,
        coverLetter: req.body.coverLetter || '',
    };

    const { error } = submitRecruitmentSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};
module.exports = { validateRecruitmentRequest };