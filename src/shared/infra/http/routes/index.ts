import { Router } from "express";

import { beerStylesRoutes } from "./beerStyles.routes";

const router = Router();

router.use("/beer_styles", beerStylesRoutes);

export { router };
