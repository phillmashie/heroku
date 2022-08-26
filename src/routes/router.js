// routes/router.js

const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../../config/db.config');
const userMiddleware = require('../middleware/users');

// routes/router.js

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM tblmykasa_users WHERE LOWER(MSISDN) = LOWER(${db.escape(
      req.body.MSISDN
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This user is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO tblmykasa_users (user_id, full_names, date_of_birth, province, city, gender, MSISDN, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                req.body.MSISDN
              )}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Registered!'
                });
              }
            );
          }
        });
      }
    }
  );
});

// routes/router.js

router.post('/login', (req, res, next) => {
  db.query(
    `SELECT * FROM tblmykasa_users WHERE MSISDN = ${db.escape(req.body.MSISDN)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Phone number or password is incorrect!'
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Phone number or password is incorrect!'
            });
          }

          if (bResult) {
            const token = jwt.sign({
                MSISDN: result[0].MSISDN,
                userId: result[0].user_id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );

            db.query(
              `UPDATE tblmykasa_users SET last_login = now() WHERE user_id = '${result[0].user_id}'`
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Phone number or password is incorrect!'
          });
        }
      );
    }
  );
});



router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

module.exports = router; 