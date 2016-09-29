import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import config from '../../config';

export const getTokenFromRequest = req => (
  req.body.token || req.params.token || req.headers.Authorization
);

export const createToken = payload => (
  jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.expiresIn
  })
);

export const verifyToken = (token, callback) => {
  jwt.verify(token, config.auth.secret, (err, decoded) => {
    if (err) {
      return callback(err);
    }

    return callback(null, decoded);
  });
};

export const encryptPassword = (password, callback) => {
  // Generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return callback(err); }

    // Hash (encrypt) our password using the salt
    return bcrypt.hash(password, salt, null, (err2, hash) => {
      if (err2) { return callback(err2); }
      return callback(null, hash);
    });
  });
};

export const comparePassword = (currentPassword, candidatePassword, callback) => (
  bcrypt.compare(candidatePassword, currentPassword, (err, isMatch) => {
    if (err) { return callback(err); }
    return callback(null, isMatch);
  })
);
