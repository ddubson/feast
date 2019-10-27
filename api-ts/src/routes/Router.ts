import {Request, Response, Router} from "express";
import {iocContainer} from "../config/AppConfig";
import {Recipe} from "../recipes/Recipe";
import {RecipesRepository} from "../recipes/RecipesRepository";

const router = Router();

const recipesRepository: RecipesRepository = iocContainer.get<RecipesRepository>("RecipesRepository");

router.route("/recipes")
  .get((req: Request, res: Response) => {
    res.json(recipesRepository.fetchAll());
  })
  .post((req: Request, res: Response) => {
    res.json(recipesRepository.save((req.body as Recipe)));
  });

router.route("/recipes/:id").get((req: Request, res: Response) => {
  res.json(recipesRepository.findById(req.params.id));
});

export default router;
