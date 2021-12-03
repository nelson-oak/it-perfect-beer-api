import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllBeerStylesUseCase } from "./ListAllBeerStylesUseCase";

class ListAllBeerStylesController {
  async handle(request: Request, response: Response) {
    const { name } = request.query;

    const listAllBeerStylesUseCase = container.resolve(
      ListAllBeerStylesUseCase
    );

    const beerStyle = await listAllBeerStylesUseCase.execute({
      name: String(name),
    });

    return response.json(beerStyle);
  }
}

export { ListAllBeerStylesController };
