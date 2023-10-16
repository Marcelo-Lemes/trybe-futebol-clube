import { ServiceResponse } from '../Interfaces/serviceResponse';
import { Encrypter } from '../Interfaces/Encrypter';
import { IUserModel } from '../Interfaces/UserModel';
import TokenGeneratorJwt from './TokenJwt';

export default class UserService {
  constructor(
    private userModel: IUserModel,
    private encrypter: Encrypter,
    private token: TokenGeneratorJwt,
  ) {}

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);

    if (!user) return { status: 'unauthorized', data: { message: 'Invalid email or password' } };

    const isValid = await this.encrypter.compare(password, user.password);

    if (!isValid) return { status: 'unauthorized', data: { message: 'Invalid email or password' } };

    const token = this.token.generate(user);

    return {
      status: 'successful',
      data: { token },
    };
  }

  async getRole(token: string): Promise<{ role: string | undefined }> {
    const decoded = this.token.reader(token);
    const { id } = decoded;
    const user = await this.userModel.findById(Number(id));
    const role = user?.role;
    return { role };
  }
}
