import { GraphQLObjectType } from 'graphql';
import createUser from './users/mutations/create';
import updateUser from './users/mutations/update';
import destroyUser from './users/mutations/destroy';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'MutationType.',
  fields: {
    createUser,
    updateUser,
    destroyUser
  }
});

export default MutationType;
