import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindPerfectBeerStyleUseCase } from "./FindPerfectBeerStyleUseCase";

class FindPerfectBeerStyleController {
  async handle(request: Request, response: Response) {
    const { temperature } = request.body;

    const findPerfectBeerStyleUseCase = container.resolve(
      FindPerfectBeerStyleUseCase
    );

    const beerStyle = await findPerfectBeerStyleUseCase.execute({
      temperature: Number(temperature),
    });

    return response.json(beerStyle);
  }
}

export { FindPerfectBeerStyleController };
