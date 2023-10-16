import * as jwt from 'jsonwebtoken';
import { IUser } from '../Interfaces/User';
import { TokenGenerator } from '../Interfaces/TokenGenerator';
import IToken from '../Interfaces/Token';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;

  generate(user: IUser): string {
    const token = this.jwt.sign({ id: user.id }, 'jwt_secret');
    return token;
  }

  reader(token: string): IToken {
    const decode = this.jwt.verify(token, 'jwt_secret');
    return decode as IToken;
  }
}
