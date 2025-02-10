import bcrypt from "bcrypt";
import tokenService from "./token-service.js";
import userModel from "../models/user-model.js";
import UserDto from "../dtos/user-dto.js";
import { ObjectId } from "mongodb";

class UserService {
  async registration(email, password, fullName) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new Error("User with that email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email,
      password: hashPassword,
      fullName
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.genrateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      throw new Error("Invalid password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.genrateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("Unauthorized");
    }

    const tokenData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!tokenData || !tokenFromDb) {
      throw new Error("Unauthorized");
    }

    const user = await userModel.findById(tokenData.id);
    if (!user) {
      throw new Error("User not found");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.genrateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    return await userModel.find({}, "-password");
  }

  async getUserById(userId) {
    const user = await userModel.findById(userId, "-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

export default new UserService();
