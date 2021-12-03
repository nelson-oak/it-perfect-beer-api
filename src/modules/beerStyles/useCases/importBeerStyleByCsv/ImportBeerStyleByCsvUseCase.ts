import { BeerStyle } from "@modules/beerStyles/infra/typeorm/entities/BeerStyle";
import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface IBeerStyle {
  name: string;
  minimum_temperature: number;
  maximum_temperature: number;
}

interface IWarning {
  message: string;
}

@injectable()
class ImportBeerStyleByCsvUseCase {
  constructor(
    @inject("BeerStylesRepository")
    private beerStylesRepository: IBeerStyleRepository
  ) {}

  private loadBeerStyles(file: Express.Multer.File): Promise<IBeerStyle[]> {
    return new Promise((resolve, reject) => {
      const beerStyles: IBeerStyle[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, minimum_temperature, maximum_temperature] = line;

          beerStyles.push({
            name: name as string,
            minimum_temperature: Number(minimum_temperature),
            maximum_temperature: Number(maximum_temperature),
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(beerStyles);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const beerStyles = await this.loadBeerStyles(file);

    const beerStylesToCreate: Promise<BeerStyle | IWarning>[] = beerStyles.map(
      ({ name, minimum_temperature, maximum_temperature }, idx) => {
        if (
          name.length > 0 &&
          Number.isInteger(minimum_temperature) &&
          Number.isInteger(maximum_temperature)
        ) {
          if (minimum_temperature <= maximum_temperature) {
            const beerStyleCreatePromises = this.beerStylesRepository
              .findByName(name)
              .then((beerStyleExists): Promise<BeerStyle | IWarning> => {
                if (!beerStyleExists) {
                  return this.beerStylesRepository.create({
                    name,
                    minimum_temperature,
                    maximum_temperature,
                  });
                }
                return Promise.resolve({
                  message: `Duplicate at line ${idx + 1}`,
                });
              });

            return beerStyleCreatePromises;
          }
        }

        return new Promise(() => {
          Promise.resolve({
            message: `Validation error at line ${idx + 1}`,
          });
        });
      }
    );

    await Promise.all<BeerStyle | IWarning>(beerStylesToCreate);
  }
}

export { ImportBeerStyleByCsvUseCase };
