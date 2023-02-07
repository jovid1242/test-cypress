const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.ValidationError("Ошибка при валидации", errors.array())
        );
      }
      const { name, email, password } = req.body;
      const userData = await userService.registrate(name, email, password);
      res.cookie("token", userData.accessToken, {
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.ValidationError("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("token", userData.accessToken, {
        httpOnly: true,
        maxAge: 60 * 6 * 24,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
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
      next(e);
    }
  }
}

module.exports = new UserController();
