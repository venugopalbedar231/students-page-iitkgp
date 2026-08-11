"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
router.post('/login', rateLimiter_1.apiLimiter, authController_1.login);
router.post('/logout', authController_1.logout);
exports.default = router;
