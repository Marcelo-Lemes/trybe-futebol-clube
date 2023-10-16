import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/User';
import { IUserModel } from '../Interfaces/UserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return {
      email: user.email,
      id: user.id,
      username: user.username,
      role: user.role,
      password: user.password,
    };
  }

  async findById(id: number | string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        id,
      },
    });

    if (!user) return null;

    return {
      email: user.email,
      id: user.id,
      username: user.username,
      role: user.role,
      password: user.password,
    };
  }
}
