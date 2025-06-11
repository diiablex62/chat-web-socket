import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Non autorisé : Token manquant",
      });
    }

    try {
      const decodedToken = jsonwebtoken.verify(token, process.env.SECRET_KEY);

      if (!decodedToken) {
        return res.status(401).json({
          message: "Non autorisé : Token invalide",
        });
      }

      const user = await User.findById(decodedToken.userId).select("-password");

      if (!user) {
        return res.status(401).json({
          message: "Non autorisé : Utilisateur non trouvé",
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      if (jwtError instanceof jsonwebtoken.TokenExpiredError) {
        return res.status(401).json({
          message: "Non autorisé : Token expiré",
        });
      }
      return res.status(401).json({
        message: "Non autorisé : Token invalide",
      });
    }
  } catch (error) {
    console.error("Erreur dans le middleware protectRoute:", error);
    return res.status(500).json({
      message: "Erreur serveur lors de l'authentification",
    });
  }
};
