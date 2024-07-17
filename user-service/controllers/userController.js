const { handleRegister, handleLogin, handleGetUser } = require('../handlers/userHandler');
const baseController = require('../../utils/baseController')

// const registerUser = async (req, res) => {
//     try {
//         const result = await handleRegister(req.body);
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const registerUser = baseController(handleRegister, {body: true, successStatus: 201});

const loginUser = async (req, res) => {
    try {
        const result = await handleLogin(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const result = await handleGetUser(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUser };
