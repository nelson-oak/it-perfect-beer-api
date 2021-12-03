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
      name: name as string,
    });

    return response.json(beerStyle);
  }
}

export { ListAllBeerStylesController };
