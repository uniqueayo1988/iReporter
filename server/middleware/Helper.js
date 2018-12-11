import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// credit: https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-postgresql-db-and-jwt-3-mke10c5c5

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} return hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  },

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    // Email Validation - Cdt: Stackoverflow
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */

  generateToken(id) {
    const token = jwt.sign({
      userId: id
    }, process.env.SECRET,
    {
      expiresIn: '1d'
    });
    return token;
  }
}

export default Helper;
