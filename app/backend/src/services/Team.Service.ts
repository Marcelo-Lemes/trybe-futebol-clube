import TeamModel from '../models/Team.Model';
import ITeam from '../Interfaces/Team';
import { ITeamModel } from '../Interfaces/TeamModel';
import { ServiceResponse } from '../Interfaces/serviceResponse';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'successful', data: allTeams };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'notFound', data: { message: 'Team not found' } };
    return { status: 'successful', data: team };
  }
}
