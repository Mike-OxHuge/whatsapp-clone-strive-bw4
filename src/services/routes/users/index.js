import express from "express";
import UserModel from "./schema.js";
import { JWTAuthMiddleware, JWTAuth, renewTokens } from "../../auth/index.js";

const router = express.Router();

router.route("/renew-tokens").post(async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    const { accessToken, refreshToken } = await renewTokens(oldRefreshToken);
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/user/renew-tokens",
    });
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

router.route("/register").post(async (req, res, next) => {
  try {
    const newUser = await new UserModel(req.body).save();
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

router.route("/login").post(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.checkCredentials(email, password);
    if (user) {
      const { accessToken, refreshToken } = await JWTAuth(user);
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/v1/user/renew-tokens",
      });

      res.status(200).send({ accessToken, refreshToken }); // access token stays on client
    } else {
      next(createError(401, "Credentials not valid!"));
    }
  } catch (error) {
    next(error);
  }
});

router.route("/users").get(JWTAuthMiddleware, async (req, res, next) => {
  const user = await UserModel.findById(req.body.userId);
  res.status(200).send(user);
});

router.route("/me").get(JWTAuthMiddleware, async (req, res, next) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    next(error);
  }
});

export default router;
