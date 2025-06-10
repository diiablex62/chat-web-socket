import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!password || password.length < 5) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 5 caractères",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileAvatar: newUser.profileAvatar,
      });
    }
    else {
      return res.status(400).json({ message: "Données utilisateur invalides" });
    }

  } catch (error) {
    console.log("error in signup controller", error);
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
