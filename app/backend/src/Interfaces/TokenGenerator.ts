import { IUser } from './User';

export interface TokenGenerator {
  generate(user: IUser): string
}
