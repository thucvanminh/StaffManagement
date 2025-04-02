// backend/validations/recruitmentValidation.js

const Joi = require('joi');

// Schema validation cho submit recruitment request
const submitRecruitmentSchema = Joi.object({
    applicantName: Joi.string().required().min(2).max(50),
    applicantEmail: Joi.string().email().required(),
    position: Joi.string().required().min(2).max(50),
    gender: Joi.string().max(10),
    applicantPhone: Joi.string().allow('').optional().min(10).max(11),
    coverLetter: Joi.string().allow('').optional(),
});

const translateDataRecruitmentRequest = (req, res, next) => {
    // Chuyển đổi từ form-data sang JSON nếu cần
    req.body = {
        applicantName: req.body.applicantName,
        applicantEmail: req.body.applicantEmail,
        gender: req.body.gender,
        position: req.body.position,
        applicantPhone: req.body.applicantPhone || '',
        coverLetter: req.body.coverLetter || '',
    };

    const { error } = submitRecruitmentSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};
module.exports = { translateDataRecruitmentRequest };