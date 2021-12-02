import { FakeBeerStylesRepository } from "@modules/beerStyles/repositories/fakes/FakeBeerStylesRepository";

import { AppError } from "@shared/errors/AppError";

import { ListBeerStyleByIdUseCase } from "./ListBeerStyleByIdUseCase";

let listBeerStyleByIdUseCase: ListBeerStyleByIdUseCase;
let fakeBeerStylesRepository: FakeBeerStylesRepository;

describe("List Beer Style By Id", () => {
  beforeEach(() => {
    fakeBeerStylesRepository = new FakeBeerStylesRepository();
    listBeerStyleByIdUseCase = new ListBeerStyleByIdUseCase(
      fakeBeerStylesRepository
    );
  });

  it("should be able to list one beer style by id", async () => {
    const { id: beerStyleId } = await fakeBeerStylesRepository.create({
      name: "a beer style name",
      minimum_temperature: -5,
      maximum_temperature: 5,
    });

    const beerStyle = await listBeerStyleByIdUseCase.execute(beerStyleId);

    expect(beerStyle.id).toBe(beerStyleId);
    expect(beerStyle.name).toEqual("a beer style name");
    expect(beerStyle.minimum_temperature).toBe(-5);
    expect(beerStyle.maximum_temperature).toBe(5);
  });

  it("should not be able to list one beer style with a non-existent id", async () => {
    await expect(
      listBeerStyleByIdUseCase.execute("non-existent-id")
    ).rejects.toEqual(new AppError("This beer style id doesn't exists!", 404));
  });
});
