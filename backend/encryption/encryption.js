const bcrypt = require('bcryptjs');

async function hashPassword(password){
    const saltRounds = 10;
    try{
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }catch (error){
        throw new Error('Password hashing failed');
    }
}


async function verifyPassword(plainPassword, hashedPassword) {
    try {
      const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return passwordMatch;
    } catch (error) {
      throw new Error('Password verification failed');
    }
  }

  module.exports = {
    hashPassword,
    verifyPassword,
  };