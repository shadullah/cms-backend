import { Router } from "express";
import {
  createText,
  getText,
  updateText,
} from "../controllers/text.controller.js";

const router = Router();

router.route("/").post(createText);
router.route("/").get(getText);
router.route("/:id").patch(updateText);

export default router;
