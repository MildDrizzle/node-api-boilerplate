import isEmail from 'validator/lib/isEmail';
import API from '../index';
import { createToken, verifyToken, encryptPassword, comparePassword } from './utils';

export const signUp = data => (
  new Promise((resolve, reject) => {
    // Validate the data
    if (!data.email) {
      return reject({
        code: 'email.empty',
        message: 'Email is empty.'
      });
    } else if (!isEmail(data.email)) {
      return reject({
        code: 'email.invalid',
        message: 'You have to provide a valid email.'
      });
    }

    if (!data.password) {
      return reject({
        code: 'password.empty',
        message: 'You have to provide a password.'
      });
    }

    // Encrypt the password
    return encryptPassword(data.password, (err, hash) => {
      if (err) {
        return reject(new Error('The password could not be hashed.'));
      }

      // Create the new user
      const newData = { ...data, password: hash };

      return API.Users.create(newData)
        .then((doc) => {
          // eslint-disable-next-line no-underscore-dangle
          resolve(createToken({ id: doc._id, email: doc.email }));
        })
        .catch((err2) => {
          if (err2.code === 11000) {
            return reject({
              code: 'user.exists',
              message: 'There is already a user with this email.'
            });
          }

          return reject(err2);
        });
    });
  })
);

export const signIn = data => (
  new Promise((resolve, reject) => {
    // Validate the data
    if (!data.email) {
      return reject({
        code: 'email.empty',
        message: 'Email is empty.'
      });
    } else if (!isEmail(data.email)) {
      return reject({
        code: 'email.invalid',
        message: 'You have to provide a valid email.'
      });
    }

    if (!data.password) {
      return reject({
        code: 'password.empty',
        message: 'You have to provide a password.'
      });
    }

    // Find the user
    return API.Users.findOne({ email: data.email })
      .then((doc) => {
        if (!doc) {
          return reject({
            code: 'user.not_found',
            message: 'Authentication failed. User not found.'
          });
        }

        return comparePassword(doc.password, data.password, (err, isMatch) => {
          if (err) { return reject(err); }
          if (!isMatch) {
            return reject({
              code: 'password.wrong',
              message: 'Wrong password.'
            });
          }

          // eslint-disable-next-line no-underscore-dangle
          return resolve(createToken({ id: doc._id, email: doc.email }));
        });
      })
      .catch(err => reject(err));
  })
);

export const isAuthenticated = token => (
  new Promise((resolve, reject) => {
    if (!token) {
      return reject({
        code: 'token.empty',
        message: 'The user token is empty.'
      });
    }

    return verifyToken(token, (err, decoded) => {
      if (err) {
        return reject({
          code: 'user.unauthenticated',
          message: 'You must be authenticated.'
        });
      }

      return resolve(decoded);
    });
  })
);

export default {
  signUp,
  signIn,
  isAuthenticated
};
