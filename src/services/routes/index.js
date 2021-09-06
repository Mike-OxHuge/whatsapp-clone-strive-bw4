import express from "express";
const router = express.Router();
router.use(express.json());

import wakeUpRouter from "./wakeup/index.js";

router.use("/v1/wakeup", wakeUpRouter);

export default router;
