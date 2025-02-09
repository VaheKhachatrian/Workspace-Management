import tokenService from "../service/token-service.js";

export class AuthMiddleware {
  static async check(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];

    const userData = await tokenService.validateAccessToken(token);

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = userData;
    next();
  }
}
