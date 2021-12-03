import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBeerStyleUseCase } from "./UpdateBeerStyleUseCase";

class ListAllBeerStylesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, minimum_temperature, maximum_temperature } = request.body;

    const updateBeerStyleUseCase = container.resolve(UpdateBeerStyleUseCase);

    const beerStyle = await updateBeerStyleUseCase.execute({
      id,
      name,
      minimum_temperature: Number(minimum_temperature),
      maximum_temperature: Number(maximum_temperature),
    });

    return response.json(beerStyle);
  }
}

export { ListAllBeerStylesController };
