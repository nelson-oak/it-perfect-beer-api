import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteBeerStyleUseCase } from "./DeleteBeerStyleUseCase";

class DeleteBeerStyleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteBeerStyleUseCase = container.resolve(DeleteBeerStyleUseCase);

    const beerStyle = await deleteBeerStyleUseCase.execute(id);

    return response.json(beerStyle);
  }
}

export { DeleteBeerStyleController };
