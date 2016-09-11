import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const HelloType = new GraphQLObjectType({
  name: 'Hello',
  description: 'HelloType.',
  fields: () => ({
    world: {
      type: GraphQLString,
      description: 'World.'
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'QueryType.',
  fields: () => ({
    hello: {
      type: HelloType,
      description: 'Greeting.',
      resolve: (parent, args, context, ast) => {
        return {
          world: 'Hello World!'
        };
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: QueryType
});

export default schema;
