import { FakeBeerStylesRepository } from "@modules/beerStyles/repositories/fakes/FakeBeerStylesRepository";

import { AppError } from "@shared/errors/AppError";

import { UpdateBeerStyleUseCase } from "./UpdateBeerStyleUseCase";

let updateBeerStyleUseCase: UpdateBeerStyleUseCase;
let fakeBeerStylesRepository: FakeBeerStylesRepository;

describe("Update Beer Style Use Case", () => {
  beforeEach(() => {
    fakeBeerStylesRepository = new FakeBeerStylesRepository();
    updateBeerStyleUseCase = new UpdateBeerStyleUseCase(
      fakeBeerStylesRepository
    );
  });

  it("should be able to update a beer style", async () => {
    const { id: beerStyleId } = await fakeBeerStylesRepository.create({
      name: "A beer style name",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    const beerStyle = await updateBeerStyleUseCase.execute({
      id: beerStyleId,
      name: "An updated beer style",
      minimum_temperature: -10,
      maximum_temperature: 10,
    });

    expect(beerStyle.name).toEqual("An updated beer style");
    expect(beerStyle.minimum_temperature).toBe(-10);
    expect(beerStyle.maximum_temperature).toBe(10);
  });

  it("should not be able to update a non-existent beer style", async () => {
    await expect(
      updateBeerStyleUseCase.execute({
        id: "non-existent-id",
        minimum_temperature: 10,
      })
    ).rejects.toEqual(new AppError("This beer style doesn't exists!", 404));
  });

  it("should not be able to update data to nullable values", async () => {
    const { id: beerStyleId } = await fakeBeerStylesRepository.create({
      name: "A beer style name",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    const beerStyle = await updateBeerStyleUseCase.execute({
      id: beerStyleId,
      name: null,
      minimum_temperature: null,
      maximum_temperature: null,
    });

    expect(beerStyle.name).toEqual("A beer style name");
    expect(beerStyle.minimum_temperature).toBe(-5);
    expect(beerStyle.maximum_temperature).toBe(5);
  });

  it("should not be able to update the beer style's name to a name of another", async () => {
    //
  });
});
