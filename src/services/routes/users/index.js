import express from "express";
import userModel from "./schema.js";

const router = express.Router();

router.route("/register").post(async (req, res, next) => {
  try {
    const newUser = await new userModel(req.body).save();
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

export default router;
