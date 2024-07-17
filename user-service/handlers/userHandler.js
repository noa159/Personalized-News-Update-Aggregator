const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const axios = require('axios');

const DAPR_PORT = 3500;
const STATE_STORE_NAME = 'statestore';
const STATE_URL = `http://localhost:${DAPR_PORT}/v1.0/state/${STATE_STORE_NAME}`;

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const state = [
        { key: `jwt-${user._id}`, value: token },
        { key: `preferences-${user._id}`, value: user.preferences }
    ];

    await axios.post(STATE_URL, state);

    return { user, token };
};

const handleChangePreferences = async ({ jwt, preferences }) => {
    const {id} = jwt.verify(jwt, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    user.preferences = preferences;
    await user.save();

    const state = { key: `preferences-${id}`, value: preferences };
    await axios.post(STATE_URL, state);
    return { user };
}

const handleGetUser = async (params) => {
    console.log(`jwt: ${JSON.stringify(params)}`)
    const { id } = jwt.verify(params.jwt, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
};

module.exports = { handleRegister, handleLogin, handleGetUser, handleChangePreferences };
