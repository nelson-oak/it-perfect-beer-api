import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteBeerStyleUseCase } from "./DeleteBeerStyleUseCase";

class DeleteBeerStyleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteBeerStyleUseCase = container.resolve(DeleteBeerStyleUseCase);

    await deleteBeerStyleUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteBeerStyleController };
