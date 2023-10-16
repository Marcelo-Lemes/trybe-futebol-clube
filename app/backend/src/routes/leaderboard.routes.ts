import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/Leaderboard.Controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/', (req: Request, res: Response) => leaderboardController.getAll(req, res));
router.get('/home', (req: Request, res: Response) => leaderboardController.getAllHome(req, res));
router.get('/away', (req: Request, res: Response) => leaderboardController.getAllAway(req, res));

export default router;
