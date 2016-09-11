import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: ENV !== 'production'
})));

app.listen(PORT, err => {
  if (err) { return err; }
  console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
});
