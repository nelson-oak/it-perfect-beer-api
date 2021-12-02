import { FakeBeerStylesRepository } from "@modules/beerStyles/repositories/fakes/FakeBeerStylesRepository";

import { AppError } from "@shared/errors/AppError";

import { DeleteBeerStyleUseCase } from "./DeleteBeerStyleUseCase";

let deleteBeerStyleUseCase: DeleteBeerStyleUseCase;
let fakeBeerStylesRepository: FakeBeerStylesRepository;

describe("Delete Beer Style", () => {
  beforeEach(() => {
    fakeBeerStylesRepository = new FakeBeerStylesRepository();
    deleteBeerStyleUseCase = new DeleteBeerStyleUseCase(
      fakeBeerStylesRepository
    );
  });

  it("should be able to delete a Beer Style", async () => {
    const { id: beerStyleId } = await fakeBeerStylesRepository.create({
      name: "a beer style name",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    // eslint-disable-next-line no-unused-expressions
    expect(deleteBeerStyleUseCase.execute(beerStyleId)).resolves;
  });
});
