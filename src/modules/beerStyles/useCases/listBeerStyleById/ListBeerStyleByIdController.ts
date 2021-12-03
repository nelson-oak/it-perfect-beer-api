import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListBeerStyleByIdUseCase } from "./ListBeerStyleByIdUseCase";

class ListAllBeerStylesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listBeerStyleByIdUseCase = container.resolve(
      ListBeerStyleByIdUseCase
    );

    const beerStyle = await listBeerStyleByIdUseCase.execute(id);

    return response.json(beerStyle);
  }
}

export { ListAllBeerStylesController };
