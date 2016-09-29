import mongoose from 'mongoose';
import User from './User';

/**
 * Create a new user.
 *
 * @param  {object} data
 * @return {promise}
 */
const create = data => (
  new User(data).save()
);

/**
 * Get all users.
 *
 * @return {promise}
 */
const all = () => (
  User.find({}).exec()
);

/**
 * Find users with the given data.
 *
 * @param  {object} data
 * @return {promise}
 */
const find = data => (
  User.find(data).exec()
);

/**
 * Find one user with the given data.
 *
 * @param  {object} data
 * @return {promise}
 */
const findOne = data => (
  User.findOne(data).exec()
);

/**
 * Find one user by its ID.
 *
 * @param  {string} userId
 * @return {promise}
 */
const findById = userId => (
  // eslint-disable-next-line new-cap
  User.findById(mongoose.Types.ObjectId(userId)).exec()
);

/**
 * Update a user.
 *
 * @param  {string} userId
 * @param  {object} data
 * @return {promise}
 */
const update = (userId, data) => (
  User.findOneAndUpdate(
    // eslint-disable-next-line new-cap
    { _id: mongoose.Types.ObjectId(userId) },
    data,
    { new: true }
  )
);

/**
 * Delete a user.
 *
 * @param  {string} userId
 * @param  {object} data
 * @return {promise}
 */
const destroy = userId => (
  // eslint-disable-next-line new-cap
  User.findOneAndRemove({ _id: mongoose.Types.ObjectId(userId) })
);

export default {
  create,
  all,
  find,
  findOne,
  findById,
  update,
  destroy
};
