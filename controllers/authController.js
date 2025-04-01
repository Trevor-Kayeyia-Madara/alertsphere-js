const supabase = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User Registration
const registerUser = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Register user in Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password: hashedPassword
        });

        if (error) throw error;

        // Generate JWT
        const token = jwt.sign({ id: data.user.id, email: data.user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Generate JWT
        const token = jwt.sign({ id: data.user.id, email: data.user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
