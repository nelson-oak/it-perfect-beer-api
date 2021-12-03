import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportBeerStyleByCsvUseCase } from "./ImportBeerStyleByCsvUseCase";

class ImportBeerStyleByCsvController {
  async handle(request: Request, response: Response) {
    const { file } = request;

    const importBeerStyleByCsvUseCase = container.resolve(
      ImportBeerStyleByCsvUseCase
    );

    const beerStyle = await importBeerStyleByCsvUseCase.execute(file);

    return response.status(204).send();
  }
}

export { ImportBeerStyleByCsvController };
