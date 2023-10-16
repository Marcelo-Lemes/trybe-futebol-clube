import { IMatches } from './Matches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findById(id: number): Promise<IMatches | null>,
  findByProgress(progress: boolean): Promise<IMatches[] | null>,
  update(id: number, data: Partial<IMatches>): Promise<IMatches | null>,
  create(data: Omit<IMatches, 'id'>): Promise<IMatches>,
}
