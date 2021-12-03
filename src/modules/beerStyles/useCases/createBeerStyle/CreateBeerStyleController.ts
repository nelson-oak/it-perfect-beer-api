import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBeerStyleUseCase } from "./CreateBeerStyleUseCase";

class CreateBeerStyleController {
  async handle(request: Request, response: Response) {
    const { name, minimum_temperature, maximum_temperature } = request.body;

    const createBeerStyleUseCase = container.resolve(CreateBeerStyleUseCase);

    const beerStyle = await createBeerStyleUseCase.execute({
      name,
      minimum_temperature: Number(minimum_temperature),
      maximum_temperature: Number(maximum_temperature),
    });

    return response.status(201).json(beerStyle);
  }
}

export { CreateBeerStyleController };
