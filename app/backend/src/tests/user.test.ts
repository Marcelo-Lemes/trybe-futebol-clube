import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';

import { Response } from 'superagent';
import mock from './mocks/userMock';
import TokenGeneratorJwt from '../services/TokenJwt';
import UserService from '../services/User.Service';
import UserModel from '../models/User.Model';
import BcryptService from '../services/BcryptService';

chai.use(chaiHttp);

const { expect } = chai;

const userModel = new UserModel();
const encrypter = new BcryptService();
const jwt = new TokenGeneratorJwt();
const userService = new UserService(userModel, encrypter, jwt);

describe('User', () => {

  describe("Login", () => {
    it('should return token', async () => {
        const userMock = SequelizeUser.build(mock.user as any)
        sinon.stub(SequelizeUser, 'findOne').resolves(userMock)
        const response = await chai.request(app)
          .post('/login')
          .send(mock.login)
        
        expect(response.status).to.be.equal(200)
        expect(response.body.token).not.to.be.undefined
      })

    it('should return error with invalid login ', async () => {
        const userMock = SequelizeUser.build(mock.user as any)
        sinon.stub(SequelizeUser, 'findOne').resolves(userMock)
        const response = await chai.request(app)
          .post('/login')
          .send(mock.invalidLogin)
        
        expect(response.status).to.be.equal(401)
        expect(response.body.message).to.equal('Invalid email or password');
      })
      
  })

  describe("GetRole", () => {
    it('should return user role', async () => {
        const role = { role: mock.user.role }
        sinon.stub(userService, 'getRole').resolves()

        const response = await chai.request(app)
        .get('/login/role')
        .send(mock.login)
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2OTIxMjg4fQ.8gPxbTI9r3LTyM2NcAlZASgJbFEfZ9Ur1LTpytXExOE');
        
        
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(role);
    })

    it('should return error without token', async () => {
        sinon.stub(userService, 'getRole').resolves()

        const response = await chai.request(app)
        .get('/login/role')
        .send(mock.login)
        
      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token not found' });
    })

    it('should return error with invalid token', async () => {
        sinon.stub(userService, 'getRole').resolves()

        const response = await chai.request(app)
        .get('/login/role')
        .send(mock.login)
        .set('Authorization', 'genericToken');
        
      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
    })
  })
  
  afterEach(sinon.restore);
});

