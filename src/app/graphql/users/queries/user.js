import { GraphQLNonNull, GraphQLString } from 'graphql';
import UserType from '../types/UserType';
import API from '../../../api';

export default ({
  type: UserType,
  description: 'Fetch a user.',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args, context) => {
    const errors = [];

    return API.Auth.isAuthenticated(context.token)
      .then(() => (
        API.Users.findById(args.id)
          .then(user => ({
            errors,
            // eslint-disable-next-line no-underscore-dangle
            id: user._id,
            email: user.email
          }))
          .catch(() => {
            throw new Error('User not found.');
          })
      ))
      .catch((err) => {
        if (err.code && err.message) {
          errors.push({
            key: err.code,
            value: err.message
          });
          return { errors };
        }

        throw new Error(err);
      });
  }
});
