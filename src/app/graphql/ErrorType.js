import { GraphQLObjectType, GraphQLString } from 'graphql';

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  description: 'ErrorType.',
  fields: () => ({
    key: {
      type: GraphQLString
    },
    value: {
      type: GraphQLString
    }
  })
});

export default ErrorType;
