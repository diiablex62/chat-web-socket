import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Non autorisé, pas de token ! " });
    }

    const decodedToken = jsonwebtoken.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      return res
        .status(400)
        .json({ message: "Non autorisé, token invalide ! " });
    }

    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Non autorisé, utilisateur non trouvé ! " });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
  }
};
