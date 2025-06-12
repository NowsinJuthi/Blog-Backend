const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.login = (req,res)=>{

}