import { GraphQLNonNull, GraphQLString } from 'graphql';
import AuthType from '../types/AuthType';
import API from '../../../api';

export default ({
  type: AuthType,
  description: 'Sign in method.',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (parent, args) => {
    const errors = [];

    return API.Auth.signIn(args)
      .then(token => ({
        token,
        errors
      }))
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
