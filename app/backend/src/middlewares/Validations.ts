import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/User.Model';
import TokenGeneratorJwt from '../services/TokenJwt';
import TeamModel from '../models/Team.Model';

const teamModel = new TeamModel();
const userModel = new UserModel();
const tokenGenerator = new TokenGeneratorJwt();

class Validations {
  static validateLoginParams(req: Request, res: Response, next: NextFunction): Response | void {
    const login = req.body;

    if (!login.email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!login.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return next();
  }

  static validateLoginIsValid(req: Request, res: Response, next: NextFunction): Response | void {
    const login = req.body;
    const message = 'Invalid email or password';
    const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(login.email);

    if (!emailValidation) {
      return res.status(401).json({ message });
    }

    if (typeof login.password !== 'string') {
      return res.status(401).json({ message });
    }

    if (login.password.length < 6) {
      return res.status(401).json({ message });
    }
    return next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    try {
      const { authorization: token } = req.headers;
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }

      const payload = tokenGenerator.reader(token);
      const user = userModel.findById(Number(payload.id));
      if (!user) {
        return res.status(401).json({ message: 'Token not found' });
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static async validateMatches(req: Request, res: Response, next: NextFunction)
    : Promise<void | Response> {
    const { homeTeamId, awayTeamId } = req.body;
    const teamOne = await teamModel.findById(Number(homeTeamId));
    const teamTwo = await teamModel.findById(Number(awayTeamId));

    console.log(teamOne);

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if (!teamOne) { return res.status(404).json({ message: 'There is no team with such id!' }); }

    if (!teamTwo) { return res.status(404).json({ message: 'There is no team with such id!' }); }

    next();
  }
}

export default Validations;
