import ITeam from './Team';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  findById(id: number): Promise<ITeam | null>,
}
