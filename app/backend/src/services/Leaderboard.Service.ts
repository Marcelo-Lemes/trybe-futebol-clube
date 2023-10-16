import { ILeaderboard } from '../Interfaces/Leaderboard';
import MatchesModel from '../models/Matches.Model';
import TeamModel from '../models/Team.Model';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import GetLeaderboard from '../database/utlis/leaderboard';
import { IMatches } from '../Interfaces/Matches';

function order(x: ILeaderboard, y: ILeaderboard) {
  let comp = x.totalPoints - y.totalPoints;
  if (comp === 0) {
    comp = x.totalVictories - y.totalVictories;
    if (comp === 0) {
      comp = x.goalsBalance - y.goalsBalance;
      if (comp === 0) {
        comp = x.goalsFavor - y.goalsFavor;
      }
    }
  } return comp;
}
export default class Leaderboard {
  constructor(
    private teamsModel: TeamModel = new TeamModel(),
    private matchesModel: MatchesModel = new MatchesModel(),
  ) {}

  async getAllHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchesModel.findByProgress(false);
    const teams = await this.teamsModel.findAll();
    const results = GetLeaderboard.totalHome(matches as IMatches[], teams);
    results.sort(order);
    results.reverse();
    return { status: 'successful', data: results };
  }

  async getAllAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchesModel.findByProgress(false);
    const teams = await this.teamsModel.findAll();
    const results = GetLeaderboard.totalAway(matches as IMatches[], teams);
    results.sort(order);
    results.reverse();
    return { status: 'successful', data: results };
  }

  async getAll(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchesModel.findByProgress(false);
    const teams = await this.teamsModel.findAll();
    const results = GetLeaderboard.total(matches as IMatches[], teams);
    results.sort(order);
    results.reverse();
    return { status: 'successful', data: results };
  }
}
