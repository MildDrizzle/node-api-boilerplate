import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import ErrorType from '../../ErrorType';

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  description: 'AuthType.',
  fields: () => ({
    errors: {
      type: new GraphQLNonNull(new GraphQLList(ErrorType))
    },
    token: {
      type: GraphQLString,
      description: 'User token.'
    }
  })
});

export default AuthType;
