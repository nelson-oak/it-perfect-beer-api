import { FakeBeerStylesRepository } from "@modules/beerStyles/repositories/fakes/FakeBeerStylesRepository";

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

  it("should be able to create a new Beer Style", async () => {
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
});
