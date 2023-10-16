import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';

import { Response } from 'superagent';
import matchesMock from './mocks/matchesMocks';



chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {

  describe("GET", () => {
    it('should return all teams', async function() {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.matches as any);
  
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesMock.matches);
    });

    it('should return all matches in Progress', async function() {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock.matchesInProgress as any);
  
      const { status, body } = await chai.request(app).get('/matches?inProgress=true');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesMock.matchesInProgress);
    });
  })

  describe("Finish", () => {
    it('should return match finished ', async function() {

        sinon.stub(SequelizeMatches, 'findByPk').resolves(matchesMock.matchInProgress as any);
        sinon.stub(SequelizeMatches, 'update').resolves([41]);


        const { status, body } = await chai.request(app)
          .patch('/matches/41/finish')
          .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2OTIxMjg4fQ.8gPxbTI9r3LTyM2NcAlZASgJbFEfZ9Ur1LTpytXExOE');
        

        expect(status).to.equal(200);
        expect(body).to.deep.equal({ message: 'Finished' });
    })

  })

  describe("Match manipulation", () => {
    it('should create a match', async function() {
        sinon.stub(SequelizeMatches, 'create').resolves(matchesMock.createMatch as any);
        
        const { id, inProgress = true , ...sendData} = matchesMock.createMatch as any;

        const { status, body } = await chai.request(app).post('/matches')
          .send(sendData)
          .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2OTIxMjg4fQ.8gPxbTI9r3LTyM2NcAlZASgJbFEfZ9Ur1LTpytXExOE');
    
        expect(status).to.equal(201);
        expect(body).to.deep.equal(matchesMock.createMatch);
      });

      it('should update a match', async function () {
        sinon.stub(SequelizeMatches, 'update').resolves([41] as any);
        sinon.stub(SequelizeMatches, 'findByPk').resolves(matchesMock.updatedMatch as any);

    
        const { id, inProgress = true, ...sendData } = matchesMock.createMatch as any;
    
        const { status, body } = await chai.request(app).patch('/matches/41')
          .send(sendData)
          .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg2OTIxMjg4fQ.8gPxbTI9r3LTyM2NcAlZASgJbFEfZ9Ur1LTpytXExOE');

        
          console.log(body);
          
    
        expect(status).to.equal(200);
        expect(body.message).to.equal('Finished');
      });
    
  })
  
  afterEach(sinon.restore);
});
