const { check } = require('express-validator');
 
exports.signupValidation = [
    check('full_names', 'Name is requied').not().isEmpty(),
    check('dirt_of_birth', 'Date of birth is requied').not().isEmpty(),
    check('province', 'Province is requied').not().isEmpty(),
    check('city', 'City is requied').not().isEmpty(),
    check('gender', 'Gender is requied').not().isEmpty(),
    check('MSISDN', 'Please include a valid phone number').not().isEmpty(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]