import { GraphQLNonNull, GraphQLString } from 'graphql';
import UserType from '../types/UserType';

export default ({
  type: UserType,
  description: 'Fetch a user.',
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString }
  },
  resolve: (parent, { name, email }) => ({
    name,
    email,
    greeting: `Hello ${name}!`
  })
});
