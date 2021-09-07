import express from "express";
import { RoomModel, MessageModel } from "./schema.js";

import { JWTAuthMiddleware } from "../../auth/index.js";
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
  //   console.log(room); // null
  //   console.log(req.body.roomId); // 61374264d2dcc13ef878267c
  res.status(200).send(room);
});
router.route("/room").get(JWTAuthMiddleware, async (req, res) => {
  const roomId = req.query.roomId;
  const room = await RoomModel.findOne({ _id: roomId });
  res.status(200).send(room);
});

router.route("/new-message").post(JWTAuthMiddleware, async (req, res) => {
  const message = await new MessageModel({
    message: req.body.message,
    user: req.user._id,
  });
  console.log(req.user); // always Whitney, even with Britney's token
  const newMessage = await RoomModel.findByIdAndUpdate(
    { _id: req.body.roomId },
    { $push: { messages: message } },
    { new: true }
  );
  res.status(201).send(newMessage);
});

export default router;
