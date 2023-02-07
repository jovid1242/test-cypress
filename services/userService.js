const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");
const ApiError = require("../exceptions/apiError");

class UserService {
  async registrate(name, email, password) {
    const candidate = await User.findOne({
      where: { email },
    });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await User.create({ name, email, password: hashPassword });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    const isPassEquals = await bcrypt.compare(String(password), user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    return { ...tokens, user: userDto };
  }

  async getByPage(page, limit) {
    return await User.findAndCountAll({
      offset: page,
      limit: limit,
    });
  }

  async addInfo(value, id) {
    return User.update(value, {
      where: { id: id },
    });

    // return User.update({ where: { id: id } }).then(function (obj) {
    //   if (obj) return obj.update(value);
    // });
  }

  async getUser(id) {
    return await User.findOne({
      where: { id },
      attributes: { exclude: ["password", "email"] },
    });
  }

  async getAll() {
    return await User.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async removeUser(id) {
    return User.destroy({ where: { id: id } });
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
