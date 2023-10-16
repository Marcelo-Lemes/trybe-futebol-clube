import { Request, Response } from 'express';
import MatchesService from '../services/Matches.Service';
import mapStatusHTTP from '../database/utlis/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  async getAllMatches(_req: Request, res: Response) {
    const response = await this.matchesService.getAllMatches();
    res.status(200).json(response.data);
  }

  async getByProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const response = await this.matchesService.getByProgress(inProgress === 'true');
      return res.status(200).json(response.data);
    }
    const response = await this.matchesService.getAllMatches();
    return res.status(200).json(response.data);
  }

  async finish(req: Request, res: Response) {
    const id = Number(req.params.id);
    const response = await this.matchesService.finish(id);
    if (response.status !== 'successful') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(200).json(response.data);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const match = req.body;
    const response = await this.matchesService.updateMatch(id, match);

    if (response.status !== 'successful') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(200).json(response.data);
  }

  public async create(req: Request, res: Response) {
    const response = await this.matchesService.createMatch(req.body);

    if (response.status !== 'successful') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    res.status(201).json(response.data);
  }
}
