import { FakeBeerStylesRepository } from "@modules/beerStyles/repositories/fakes/FakeBeerStylesRepository";

import { ListAllBeerStylesUseCase } from "./ListAllBeerStylesUseCase";

let listAllBeerStylesUseCase: ListAllBeerStylesUseCase;
let fakeBeerStylesRepository: FakeBeerStylesRepository;

describe("List All Beer Styles", () => {
  beforeEach(() => {
    fakeBeerStylesRepository = new FakeBeerStylesRepository();
    listAllBeerStylesUseCase = new ListAllBeerStylesUseCase(
      fakeBeerStylesRepository
    );
  });

  it("should be able to list all beer styles without filter", async () => {
    await fakeBeerStylesRepository.create({
      name: "a beer style name 1",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    await fakeBeerStylesRepository.create({
      name: "a beer style name 2",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    await fakeBeerStylesRepository.create({
      name: "a beer style name 3",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    const beerStyles = await listAllBeerStylesUseCase.execute({});

    expect(beerStyles.length).toBe(3);
  });

  it("should be able to list all beer styles filtering by name", async () => {
    await fakeBeerStylesRepository.create({
      name: "filtered beer style 1",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    await fakeBeerStylesRepository.create({
      name: "a beer style name 2",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    await fakeBeerStylesRepository.create({
      name: "a beer style name 3",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    const beerStyles = await listAllBeerStylesUseCase.execute({
      name: "filtered",
    });

    expect(beerStyles.length).toBe(1);
  });

  it("should return an empty array if there isn't a beer style to show", async () => {
    const beerStyles = await listAllBeerStylesUseCase.execute({});

    expect(beerStyles).toEqual([]);
  });
});
