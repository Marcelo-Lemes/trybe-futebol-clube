import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/Matches.Controller';
import Validations from '../middlewares/Validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getByProgress(req, res));
router.post(
  '/',
  Validations.validateToken,
  Validations.validateMatches,
  (req: Request, res: Response) =>
    matchesController.create(req, res),
);
router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) =>
    matchesController.update(req, res),
);
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) =>
    matchesController.finish(req, res),
);

export default router;
