import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const newUser = this; // this is the user object
  if (newUser.createdAt === newUser.updatedAt) {
    const avatar = "https://eu.ui-avatars.com/api/?name=" + newUser.name;
    newUser.avatar = avatar;
  }

  const plainPW = newUser.password;
  if (newUser.isModified("password")) {
    newUser.password = await bcrypt.hash(plainPW, 10);
  }
  next();
});

UserSchema.methods.toJSON = function () {
  // toJSON is called every time express does a res.send

  const userDocument = this;

  const userObject = userDocument.toObject();

  delete userObject.password;
  delete userObject.refreshToken;
  delete userObject.__v; // don't display this crap

  return userObject;
};

UserSchema.statics.checkCredentials = async function (email, plainPW) {
  // 1. find user in db by email
  const user = await this.findOne({ email });
  if (user) {
    // 2. if user is found we need to compare plainPW with hashed PW
    const isMatch = await bcrypt.compare(plainPW, user.password);
    // 3. return a meaningful response
    if (isMatch) return user;
    else return "Wrong password";
  } else {
    return "User not found";
  }
};
UserSchema.plugin(uniqueValidator);
export default model("User", UserSchema);
