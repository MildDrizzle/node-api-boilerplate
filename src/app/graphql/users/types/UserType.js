import { GraphQLObjectType, GraphQLString } from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'UserType.',
  fields: {
    name: {
      type: GraphQLString,
      description: 'User name.'
    },
    email: {
      type: GraphQLString,
      description: 'User email.'
    },
    greeting: {
      type: GraphQLString,
      description: 'Greeting.'
    }
  }
});

export default UserType;
