const bcrypt = require('bcryptjs');

const _crypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    return {password: newPassword, salt: salt};
};
module.exports = _crypt;