import db from '../db';
import Helper from '../middleware/helper';

async () => {
  const hashPassword = Helper.hashPassword('admin');

  const createQuery = `INSERT INTO
    users(firstname, lastname, othernames, email, phoneNumber, username, registered, isAdmin, password)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning *`;
  const thisDay = new Date();
  const values = [
    'Ayo',
    'Bayo',
    'Giwa',
    'ayo@andela.com',
    '08055353514',
    'ayo',
    thisDay,
    true,
    hashPassword
  ];

  try {
    const { rows } = await db.query(createQuery, values);
    return Helper.generateToken(rows[0].id);
  } catch (error) {
    console.log(error);
  }
};
