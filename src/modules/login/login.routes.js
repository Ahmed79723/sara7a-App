import { Router } from "express";
import * as loginController from "./login.controller.js";

const loginRouter = Router();

loginRouter.get("/login", loginController.login);
loginRouter.post("/handleLogin", loginController.handleLogin);

export default loginRouter;
