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
});
