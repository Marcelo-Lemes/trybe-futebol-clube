import { Request, Router, Response } from 'express';
import UserController from '../controllers/User.Controller';
import UserModel from '../models/User.Model';
import BcryptService from '../services/BcryptService';
import TokenGeneratorJwt from '../services/TokenJwt';
import UserService from '../services/User.Service';
import Validations from '../middlewares/Validations';

const userModel = new UserModel();
const encrypter = new BcryptService();
const tokenGenerator = new TokenGeneratorJwt();
const userService = new UserService(userModel, encrypter, tokenGenerator);
const userController = new UserController(userService);

const router = Router();

router.post(
  '/',
  Validations.validateLoginParams,
  Validations.validateLoginIsValid,
  (req: Request, res: Response) => userController.login(req, res),
);
router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default router;
