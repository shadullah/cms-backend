import { Router } from "express";
import {
  createFeedback,
  getFeedbacks,
} from "../controllers/feedback.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(
  upload.fields([
    {
      name: "imgFeed",
      maxCount: 1,
    },
  ]),
  createFeedback
);
router.route("/").get(getFeedbacks);

export default router;
