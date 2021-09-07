import express from "express";
const router = express.Router();
router.use(express.json());

import wakeUpRouter from "./wakeup/index.js";
import userRouter from "./users/index.js";
import chatRoute from "./chats/index.js";

router.use("/v1/wakeup", wakeUpRouter);
router.use("/v1/user", userRouter);
router.use("/v1/chats", chatRoute);

export default router;
