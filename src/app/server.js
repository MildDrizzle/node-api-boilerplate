/* eslint-disable */
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import { getTokenFromRequest } from './api/auth/utils';
import config from './config';

const app = express();
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('We are connected!'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  context: {
    token: getTokenFromRequest(req)
  },
  pretty: true,
  graphiql: ENV !== 'production'
})));

const server = app.listen(PORT, err => {
  if (err) { return err; }
  console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
});

export default server;
