const ApiError = require('../exceptions/apiError')

module.exports = function (req, res, next) {
    try {
        if (req.user.status !== 'admin') {
            return next(ApiError.PermissionDenaid());
        }
        next();
    } catch (e) {
        console.log(e);
        return next(ApiError.UnauthorizedError());
    }
};