const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { generateAccessToken } = require("../utils/helperFunctions");
const { upload } = require("../services/s3Service");

const userController = {};

userController.login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email, password)) res.status(400).send("All input is required");

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await generateAccessToken({ email, id: user.id });
    // user.token = token;

    user = {
      email: user.email,
      name: user.name,
      profile: user.profile,
      token,
    };

    return res
      .status(200)
      .json({ message: "User Logged In Succesfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

userController.register = async (req, res) => {
  const { name, email, password } = JSON.parse(req.body.credentails);
  let location = null;

  if (!(email && password && name)) {
    res
      .status(400)
      .json({ message: "All input fields are required", data: null });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists", data: null });
    }

    if (req.body.img && req.body.name) {
      const uploadRes = await upload(req.body.img, req.body.name);
      if (!uploadRes.success) {
        return res.status(400).json({ message: uploadRes.message, data: null });
      }

      location = uploadRes.location;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      profile: location,
    }).catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "User server error" });
    });

    const token = await generateAccessToken({
      email: newUser.email,
      id: newUser._id,
    });

    const user = {
      email: newUser.email,
      name: newUser.name,
      profile: newUser.profile,
      token,
    };
    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = userController;
