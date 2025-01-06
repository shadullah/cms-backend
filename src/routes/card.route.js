import { Router } from "express";
import { createCard, getAllCards } from "../controllers/card.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(
  upload.fields([
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  createCard
);

router.route("/").get(getAllCards);

export default router;
