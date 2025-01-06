import { Router } from "express";
import { createTags, getTags } from "../controllers/tags.controller.js";

const router = Router();

router.route("/").post(createTags);
router.route("/").get(getTags);

export default router;
