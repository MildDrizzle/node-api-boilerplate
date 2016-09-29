export default {
  database: {
    host: 'localhost',
    port: 27017,
    name: 'test'
  },
  auth: {
    secret: 'super_secret_word', // CHANGE IT!
    expiresIn: 86400 // expires in 24 hours
  }
};
