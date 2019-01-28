import db from '../db';
import Helper from '../middleware/helper';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async signup(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(firstname, lastname, othernames, email, phoneNumber, username, registered, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const thisDay = new Date();
    const values = [
      req.body.firstname.trim(),
      req.body.lastname.trim(),
      req.body.othernames.trim(),
      req.body.email.trim(),
      req.body.phoneNumber.trim(),
      req.body.username.trim(),
      thisDay,
      hashPassword
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const firstName = rows[0].firstname;
      const lastName = rows[0].lastname;
      const Email = rows[0].email;
      const phonenumber = rows[0].phoneNumber;
      const Username = rows[0].username;
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({
        status: 201,
        data: [{
          token,
          user: {
            firstName,
            lastName,
            Email,
            phonenumber,
            Username
          }
        }]
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(404).send({
          status: 404,
          message: 'User with that EMAIL already exist'
        });
      }
      return res.status(400).send(error);
    }
  },

  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0] || !Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({
          status: 400,
          message: 'You have entered invalid credentials'
        });
      }
      // if (!Helper.comparePassword(rows[0].password, req.body.password)) {
      //   return res.status(400).send(
      //     {
      //       status: 400,
      //       message: 'Your password is incorrect'
      //     }
      //   );
      // }
      const token = Helper.generateToken(rows[0].id);
      const firstName = rows[0].firstname;
      const lastName = rows[0].lastname;
      const Email = rows[0].email;
      const phonenumber = rows[0].phoneNumber;
      const Username = rows[0].username;
      return res.status(200).send({
        status: 200,
        data: [{
          token,
          user: {
            firstName,
            lastName,
            Email,
            phonenumber,
            Username
          }
        }]
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

};

export default User;