const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const handleRegister = async ({ email, password, preferences }) => {
    console.log(`email: ${email}, password: ${password}, preferences: ${preferences}`)
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword, preferences });
    return newUser.save();
};

const handleLogin = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Password does not match');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return { user, token };
};

const handleGetUser = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
};

module.exports = { handleRegister, handleLogin, handleGetUser };
