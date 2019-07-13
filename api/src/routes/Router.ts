import {Request, Response, Router} from "express";
import {iocContainer} from "../config/AppConfig";
import {RecipesRepository} from "../recipes/RecipesRepository";

const router = Router();

const recipesRepository: RecipesRepository = iocContainer.get<RecipesRepository>("RecipesRepository");

router.route("/recipes").get((req: Request, res: Response) => {
  res.json(recipesRepository.fetchAll());
});

router.route("/recipes/:id").get((req: Request, res: Response) => {
  res.json(recipesRepository.findById(req.params.id));
});

export default router;
