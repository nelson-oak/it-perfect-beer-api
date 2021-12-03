import uploadConfig from "@config/upload";
import { CreateBeerStyleController } from "@modules/beerStyles/useCases/createBeerStyle/CreateBeerStyleController";
import { DeleteBeerStyleController } from "@modules/beerStyles/useCases/deleteBeerStyle/DeleteBeerStyleController";
import { FindPerfectBeerStyleController } from "@modules/beerStyles/useCases/findPerfectBeerStyle/FindPerfectBeerStyleController";
import { ImportBeerStyleByCsvController } from "@modules/beerStyles/useCases/importBeerStyleByCsv/ImportBeerStyleByCsvController";
import { ListAllBeerStylesController } from "@modules/beerStyles/useCases/listAllBeerStyles/ListAllBeerStylesController";
import { ListBeerStyleByIdController } from "@modules/beerStyles/useCases/listBeerStyleById/ListBeerStyleByIdController";
import { UpdateBeerStyleController } from "@modules/beerStyles/useCases/updateBeerStyle/UpdateBeerStyleController";
import { Router } from "express";
import multer from "multer";

const upload = multer(uploadConfig);

const createBeerStyleController = new CreateBeerStyleController();
const listAllBeerStylesController = new ListAllBeerStylesController();
const listBeerStyleByIdController = new ListBeerStyleByIdController();
const updateBeerStyleController = new UpdateBeerStyleController();
const deleteBeerStyleController = new DeleteBeerStyleController();
const importBeerStyleByCsvController = new ImportBeerStyleByCsvController();
const findPerfectBeerStyleController = new FindPerfectBeerStyleController();

const beerStylesRoutes = Router();

beerStylesRoutes.post("/", createBeerStyleController.handle);
beerStylesRoutes.get("/", listAllBeerStylesController.handle);
beerStylesRoutes.get("/:id", listBeerStyleByIdController.handle);
beerStylesRoutes.put("/:id", updateBeerStyleController.handle);
beerStylesRoutes.delete("/:id", deleteBeerStyleController.handle);

beerStylesRoutes.post("/import", importBeerStyleByCsvController.handle);

beerStylesRoutes.post(
  "/perfect",
  upload.single("file"),
  findPerfectBeerStyleController.handle
);

export { beerStylesRoutes };
