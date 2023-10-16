import { Request, Response } from 'express';
import UserService from '../services/User.Service';
import mapStatusHTTP from '../database/utlis/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService: UserService,
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.login(email, password);

    if (serviceResponse.status !== 'successful') {
      const code = mapStatusHTTP(serviceResponse.status);
      return res.status(code).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  async getRole(req: Request, res: Response): Promise<Response> {
    const { authorization: token } = req.headers;
    const role = await this.userService.getRole(token as string);
    console.log(role);
    return res.status(200).json(role);
  }
}
