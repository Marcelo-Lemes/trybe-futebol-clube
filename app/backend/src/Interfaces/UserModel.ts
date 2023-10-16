import { IUser } from './User';

export interface IUserModel {
  findByEmail(email: string): Promise<IUser | null>,
  findById(id: number): Promise<IUser | null>
}
