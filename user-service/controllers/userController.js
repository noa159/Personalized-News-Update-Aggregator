const { handleRegister, handleLogin, handleGetUser, handleChangePreferences } = require('../handlers/userHandler');
const baseController = require('../utils/baseController')

// const registerUser = async (req, res) => {
//     try {
//         const result = await handleRegister(req.body);
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const registerUser = baseController(handleRegister, {body: true, successStatus: 201});

const loginUser = baseController(handleLogin, {body: true});

const getUser = baseController(handleGetUser, {params: true});

const changePreferences = baseController(handleChangePreferences, {body: true});

module.exports = { registerUser, loginUser, getUser, changePreferences };
