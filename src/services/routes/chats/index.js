import express from "express";
import { RoomModel, MessageModel } from "./schema.js";

import { JWTAuthMiddleware, JWTAuth, renewTokens } from "../../auth/index.js";
const router = express.Router();

router.route("/").get(JWTAuthMiddleware, async (req, res) => {
  res.send(req.user);
});

router.route("/create-room").post(JWTAuthMiddleware, async (req, res) => {
  const user = req.user;
  const room = await new RoomModel({
    name: req.body.name,
    $push: { members: user._id },
  }).save();
  res.status(201).send(room);
});

router.route("/join-room").post(JWTAuthMiddleware, async (req, res) => {
  const user = req.user;
  console.log(user);
  const room = await RoomModel.findOneAndUpdate(
    { _id: req.body.roomId },
    { $push: { members: user._id } },
    { new: true }
  );
  console.log(room); // null
  console.log(req.body.roomId); // 61374264d2dcc13ef878267c
  res.status(200).send(room);
});
export default router;

// Britney:
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM3MzAyY2VmNjhkMzIzM2RjNTUzYzgiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJCcml0bmV5IiwiaWF0IjoxNjMxMDEyMjA4LCJleHAiOjE2MzE2MTcwMDh9.0tzfLJSe0OxrRhd-eRx4p_8-Jeo-m4uI9Rfc3lXydrU

// Whitney
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTM3NDAwYWQ2YWNmOTNiNjY2ODQxYWEiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJXaHRuZXkiLCJpYXQiOjE2MzEwMTA4MzUsImV4cCI6MTYzMTYxNTYzNX0.IA8nrXmiKcny9U84eYyA3riO9VOSivGzOOAUZI-Db3Q
