import mongoose from "mongoose";
import UserSchema from "../users/schema.js";
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const RoomSchema = new Schema({
  name: { type: String, default: "New Room" },
  avatar: { type: String, default: "https://i.imgur.com/X2JhY8Y.png" },
  messages: {
    type: [MessageSchema],
    default: [],
  },
  members: { type: [Schema.Types.ObjectId], ref: "User" },
});

export const RoomModel = model("Room", RoomSchema);
export const MessageModel = model("Message", MessageSchema);
