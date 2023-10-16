import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatches } from '../Interfaces/Matches';
import { IMatchesModel } from '../Interfaces/MatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });
    return dbData.map(({
      id, homeTeamId, homeTeamGoals, awayTeamId,
      awayTeamGoals, inProgress, homeTeam, awayTeam }) => (
      { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }
    ));
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findOne({
      include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] }],
      where: { id },
    });
    if (dbData == null) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId,
      awayTeamGoals, inProgress, homeTeam, awayTeam }: IMatches = dbData;
    return { id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
      homeTeam,
      awayTeam };
  }

  async findByProgress(inProgress: boolean): Promise<IMatches[] | null> {
    const dbData = await this.model.findAll({
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
      where: { inProgress },
    });
    return dbData.map(({
      id, homeTeamId, homeTeamGoals, awayTeamId,
      awayTeamGoals, homeTeam, awayTeam }) => (
      { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }
    ));
  }

  async update(id: number, data: Partial<IMatches>): Promise<IMatches | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });

    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async create(data: Omit<IMatches, 'id'>): Promise<IMatches> {
    const dbData = await this.model.create(data);

    const { id, homeTeamId, homeTeamGoals, awayTeamId,
      awayTeamGoals, inProgress }: IMatches = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
