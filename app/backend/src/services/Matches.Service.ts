import MatchesModel from '../models/Matches.Model';
import { IMatchUpdate, IMatches } from '../Interfaces/Matches';
import { IMatchesModel } from '../Interfaces/MatchesModel';
import { ServiceResponse } from '../Interfaces/serviceResponse';

const message = 'No matches found';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel = new MatchesModel()) {}

  async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'successful', data: allMatches };
  }

  async getByProgress(inProgress: boolean): Promise<ServiceResponse<IMatches[] | null>> {
    const matches = await this.matchesModel.findByProgress(inProgress);
    if (!matches) {
      return { status: 'notFound', data: { message } };
    }
    return { status: 'successful', data: matches };
  }

  async finish(id: number): Promise<ServiceResponse<{ message: string }>> {
    const finished = await this.matchesModel.update(id, { inProgress: false });
    if (!finished) return { status: 'notFound', data: { message } };
    return { status: 'successful', data: { message: 'Finished' } };
  }

  async updateMatch(id: number, match: IMatchUpdate):
  Promise<ServiceResponse<{ message: string }>> {
    const foundMatch = await this.matchesModel.findById(id);
    if (!foundMatch) return { status: 'notFound', data: { message: 'Match not found' } };

    const updatedMatch = await this.matchesModel.update(id, match);
    if (!updatedMatch) {
      return { status: 'notFound', data: { message } };
    }
    return { status: 'successful', data: { message: 'Finished' } };
  }

  async createMatch(match:(Omit<IMatches, 'id'>)): Promise<ServiceResponse<IMatches>> {
    const matchData = match;
    matchData.inProgress = true;
    const newMatch = await this.matchesModel.create(matchData);
    return { status: 'successful', data: newMatch };
  }
}
