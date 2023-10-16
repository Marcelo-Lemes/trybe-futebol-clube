import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.Service';

export default class MatchesController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  async getAllHome(_req: Request, res: Response) {
    const response = await this.leaderboardService.getAllHome();
    res.status(200).json(response.data);
  }

  async getAllAway(_req: Request, res: Response) {
    const response = await this.leaderboardService.getAllAway();
    res.status(200).json(response.data);
  }

  async getAll(_req: Request, res: Response) {
    const response = await this.leaderboardService.getAll();
    res.status(200).json(response.data);
  }
}
