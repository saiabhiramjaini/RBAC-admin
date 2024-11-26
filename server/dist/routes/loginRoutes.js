"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControllers_1 = require("../controllers/loginControllers");
const loginRouter = (0, express_1.Router)();
loginRouter.post('/', loginControllers_1.createUser);
loginRouter.post('/login', loginControllers_1.loginUser);
loginRouter.get('/logout', loginControllers_1.logoutUser);
exports.default = loginRouter;
