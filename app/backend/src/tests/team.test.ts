import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import teamMock from './mocks/teamMock';
import TeamModel from '../models/Team.Model';


chai.use(chaiHttp);

const { expect } = chai;
const teamModel = new TeamModel();

describe('Teams', () => {

  describe("GET", () => {
    it('should return all teams', async function() {
      
      sinon.stub(teamModel, 'findAll').resolves(teamMock.teams as any);
  
      const { status, body } = await chai.request(app).get('/teams');
      
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamMock.teams);
    });

    it('should return a team by id', async function() {
      sinon.stub(teamModel, 'findById').resolves(teamMock.team as any);
  
      const { status, body } = await chai.request(app).get('/teams/7');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamMock.team);
    });

    it('should return not found if the team doesn\'t exists', async function() {
      sinon.stub(SequelizeTeam, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).get('/teams/5');
  
      expect(status).to.equal(404);
      expect(body.message).to.equal('Team not found');
    });
  })
  
  afterEach(sinon.restore);
});
