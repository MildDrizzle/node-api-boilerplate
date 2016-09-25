import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';

describe('Graph API', () => {

  let server;

  beforeEach(() => {
    server = require('../src/app/server').default;
  });

  afterEach((done) => {
    server.close();
    done();
  });

  it('returns the user args and greeting', done => {
    const query = `
      {
        user(name: "Alice", email: "alice@domain.com") {
          name
          email
          greeting
        }
      }
    `;

    request(server)
      .post('/graphql')
      .send({ query })
      .end((err, res) => {
        if (err) { return done(err); }
        expect(JSON.parse(res.text)).to.deep.equal({
          data: {
            user: {
              name: 'Alice',
              email: 'alice@domain.com',
              greeting: 'Hello Alice!'
            }
          }
        });
        done();
      });
  });

});
