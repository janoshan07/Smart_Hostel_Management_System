const User = require('../models/User');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = { user: { id: user.id, role: user.role, profileId: user.profileId } };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerStudent = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, registrationNumber, gender, contactNumber, course, batchYear } = req.body;

        const normalizedEmail = String(email || '').trim().toLowerCase();
        const normalizedFirstName = String(firstName || '').trim();
        const normalizedLastName = String(lastName || '').trim() || 'Not Provided';
        const normalizedRegistrationNumber = String(registrationNumber || '').trim();
        const normalizedContactNumber = String(contactNumber || '').trim();
        const normalizedCourse = String(course || '').trim();
        const normalizedGender = gender ? String(gender).trim() : undefined;

        if (!normalizedEmail) {
            return res.status(400).json({ success: false, message: 'Email is required', msg: 'Email is required' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ success: false, message: 'Invalid email format', msg: 'Invalid email format' });
        }

        if (!password || String(password).length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters', msg: 'Password must be at least 6 characters' });
        }

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!normalizedFirstName || !nameRegex.test(normalizedFirstName)) {
            return res.status(400).json({ success: false, message: 'Name must contain only letters and spaces', msg: 'Name must contain only letters and spaces' });
        }
        if (!nameRegex.test(normalizedLastName)) {
            return res.status(400).json({ success: false, message: 'Name must contain only letters and spaces', msg: 'Name must contain only letters and spaces' });
        }

        if (!normalizedRegistrationNumber) {
            return res.status(400).json({ success: false, message: 'Registration number is required', msg: 'Registration number is required' });
        }

        if (!normalizedCourse) {
            return res.status(400).json({ success: false, message: 'Course is required', msg: 'Course is required' });
        }

        const currentYear = new Date().getFullYear();
        const parsedYear = parseInt(batchYear, 10);
        if (isNaN(parsedYear) || parsedYear < currentYear - 3 || parsedYear > currentYear) {
            return res.status(400).json({
                success: false,
                message: 'Enrollment year must be within the last 3 years or current year',
                msg: 'Enrollment year must be within the last 3 years or current year'
            });
        }

        let user = await User.findOne({ email: normalizedEmail });
        if (user) return res.status(400).json({ success: false, message: 'User already exists with this email', msg: 'User already exists with this email' });

        let existingStudent = await Student.findOne({ registrationNumber: normalizedRegistrationNumber });
        if (existingStudent) return res.status(400).json({ success: false, message: 'Registration number already registered', msg: 'Registration number already registered' });

        user = new User({ email: normalizedEmail, password, role: 'Student' });
        await user.save();

        let student;
        try {
            student = new Student({
                userId: user._id,
                firstName: normalizedFirstName,
                lastName: normalizedLastName,
                registrationNumber: normalizedRegistrationNumber,
                gender: normalizedGender,
                contactNumber: normalizedContactNumber,
                course: normalizedCourse,
                batchYear: parsedYear
            });
            await student.save();
        } catch (profileErr) {
            await User.findByIdAndDelete(user._id);
            throw profileErr;
        }

        user.profileId = student._id;
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            token: generateToken(user),
            user: { id: user._id, role: user.role, profileId: user.profileId }
        });
    } catch (err) {
        console.error('Student Registration Error:', err.message);
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyPattern || {})[0] || 'field';
            return res.status(400).json({
                success: false,
                message: `${duplicateField} is already registered`,
                msg: `${duplicateField} is already registered`
            });
        }
        res.status(500).json({ success: false, message: 'Server Error: ' + err.message, msg: 'Server Error: ' + err.message });
    }
};

exports.registerAdmin = async (req, res, next) => {
    try {
        console.log('Admin Registration Request Body:', req.body);
        const { email, password, firstName, lastName, employeeId, roleLevel, department, role } = req.body;
        
        // Email validation
        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: 'Email is required', msg: 'Email is required' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({ success: false, message: 'Invalid email format', msg: 'Invalid email format' });
        }

        // Input validation
        if (!password || !firstName || !lastName || !employeeId) {
            return res.status(400).json({ success: false, message: 'All fields required' });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ success: false, message: 'Admin already exists' });
        
        let existingAdmin = await Admin.findOne({ employeeId });
        if (existingAdmin) return res.status(400).json({ success: false, message: 'Admin already exists' });

        user = new User({ email, password, role: 'Admin' });
        await user.save(); // Password hashing happens here due to pre-save hook in User model

        const admin = new Admin({ userId: user._id, firstName, lastName, employeeId, roleLevel, department });
        await admin.save();

        user.profileId = admin._id;
        await user.save();

        res.json({ success: true, message: "Admin registered successfully", token: generateToken(user), user: { id: user._id, role: user.role, profileId: user.profileId } });
    } catch (err) {
        console.error('Admin Registration Error:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        if (!user.isActive) return res.status(403).json({ msg: 'Account disabled' });

        let profileData = null;
        if (user.role === 'Admin' && user.profileId) {
            profileData = await Admin.findById(user.profileId);
        } else if (user.role === 'Student' && user.profileId) {
            profileData = await Student.findById(user.profileId);
        }

        const name = profileData ? `${profileData.firstName} ${profileData.lastName}` : '';
        const profilePic = profileData && profileData.profilePic ? profileData.profilePic : '';

        res.json({ 
            token: generateToken(user), 
            user: { 
                id: user._id, 
                role: user.role, 
                profileId: user.profileId,
                name,
                email: user.email,
                profilePic
            } 
        });
    } catch (err) {
        res.status(500).send('Server Error: ' + err.message);
    }
};
