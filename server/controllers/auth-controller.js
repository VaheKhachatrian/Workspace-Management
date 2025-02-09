import userService from "../service/user-service.js";
import { validationResult } from "express-validator";

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation error", errors: errors.array() });
      }

      const { email, password, fullName } = req.body;
      if (!email || !password || !fullName)
        return res
          .status(400)
          .json({ message: "Email, Fullname or password not provided" });
      const userData = await userService.registration(email, password, fullName);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(201).json(userData);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ message: "Logged out successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new AuthController();
