import { FakeBeerStylesRepository } from "@modules/beerStyles/repositories/fakes/FakeBeerStylesRepository";

import { AppError } from "@shared/errors/AppError";

import { CreateBeerStyleUseCase } from "./CreateBeerStyleUseCase";

let createBeerStyleUseCase: CreateBeerStyleUseCase;
let fakeBeerStylesRepository: FakeBeerStylesRepository;

describe("Create Beer Style", () => {
  beforeEach(() => {
    fakeBeerStylesRepository = new FakeBeerStylesRepository();
    createBeerStyleUseCase = new CreateBeerStyleUseCase(
      fakeBeerStylesRepository
    );
  });

  it("should be able to create a new beer style", async () => {
    const beerStyle = await createBeerStyleUseCase.execute({
      name: "a beer style name",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    expect(beerStyle).toHaveProperty("id");
    expect(beerStyle.name).toEqual("a beer style name");
    expect(beerStyle.minimum_temperature).toBe(-5);
    expect(beerStyle.maximum_temperature).toBe(5);
  });

  it("should not be able to create two beer styles with the same name", async () => {
    const beerStyleData = {
      name: "a beer style name",
      minimum_temperature: -5,
      maximum_temperature: 5,
    };

    await fakeBeerStylesRepository.create(beerStyleData);

    await expect(createBeerStyleUseCase.execute(beerStyleData)).rejects.toEqual(
      new AppError("A beer style with this name already exists!")
    );
  });

  it("should not be able to create a beer style with minimum temperature greater than maximum temperature", async () => {
    await expect(
      createBeerStyleUseCase.execute({
        name: "a beer style name",
        minimum_temperature: 5,
        maximum_temperature: -5,
      })
    ).rejects.toEqual(
      new AppError(
        "Minimum temperature can't be greater than maximum temperature!"
      )
    );
  });
});
