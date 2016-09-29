import { GraphQLObjectType } from 'graphql';
import signUp from './auth/mutations/signUp';
import signIn from './auth/mutations/signIn';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'MutationType.',
  fields: {
    signUp,
    signIn
  }
});

export default MutationType;
