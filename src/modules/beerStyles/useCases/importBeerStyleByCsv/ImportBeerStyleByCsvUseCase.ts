import { IBeerStyleRepository } from "@modules/beerStyles/repositories/IBeerStylesRepository";
import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface IBeerStyle {
  name: string;
  minimum_temperature: number;
  maximum_temperature: number;
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
            name,
            minimum_temperature,
            maximum_temperature,
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

    beerStyles.map(
      async ({ name, minimum_temperature, maximum_temperature }) => {
        if (
          name.length > 0 &&
          (minimum_temperature || minimum_temperature === 0) &&
          (maximum_temperature || maximum_temperature === 0)
        ) {
          if (minimum_temperature <= maximum_temperature) {
            const beerStyleExists = await this.beerStylesRepository.findByName(
              name
            );

            if (!beerStyleExists) {
              await this.beerStylesRepository.create({
                name,
                minimum_temperature,
                maximum_temperature,
              });
            }
          }
        }
      }
    );
  }
}

export { ImportBeerStyleByCsvUseCase };
