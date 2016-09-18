import { GraphQLObjectType } from 'graphql';
import user from './users/queries/user';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'QueryType.',
  fields: {
    user
  }
});

export default QueryType;
