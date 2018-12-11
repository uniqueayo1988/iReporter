import moment from 'moment';
import db from '../db';
import Helper from '../middleware/Helper';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async create(req, res) {
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(firstname, lastname, othernames, email, phoneNumber, username, registered, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.othernames,
      req.body.email,
      req.body.phoneNumber,
      req.body.username,
      moment().format('LLLL'),
      hashPassword
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const userDetails = rows[0];
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({
        status: 201,
        data: [{
          token,
          user: userDetails
        }]
      });
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(error);
    }
  }

};

export default User;
