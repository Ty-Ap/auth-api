'use strict';

const { db } = require('../src/models/');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);


//syncdb on start
beforeAll(async()=>{
  await db.sync();
});

//drop db after
afterAll(async()=>{
  await db.drop();
});


describe ('AUTH', () => {
  it('allows users to be authenticated', async ()=> {

    let response = await request.post('/signup').send({
      username: 'test',
      password: 'pass123',
      role: 'admin',
    });

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('test');
    expect(response.body.user.password).toBeTruthy();
    expect(response.body.user.role).toBeEqual('admin');
  });

  

});
