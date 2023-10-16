import { Request, Response } from 'express';
import TeamService from '../services/Team.Service';
import mapStatusHTTP from '../database/utlis/mapStatusHTTP';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async getAllTeams(_req: Request, res: Response) {
    const response = await this.teamService.getAllTeams();
    res.status(200).json(response.data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const response = await this.teamService.getTeamById(Number(id));

    if (response.status !== 'successful') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    res.status(200).json(response.data);
  }
}
