const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { plugin } = require('mongoose');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existing = await User.find({ username });
        if (existing) return res.status(404).json({ massage: 'User already exists' })

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)

        const user = new User({ username, password: hashed })
        await user.save();

        res.status(404).json({ massage: 'User Registered' })

    } catch (error) {
        res.status(500).send('server error')
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = User.findOne({ username })
        if (!user) return res.status(404).json({ massage: 'User not found' })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ massage: 'Invalid' })

        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token })

    } catch (error) {
        res.status(500).send('Server error');
    }
}