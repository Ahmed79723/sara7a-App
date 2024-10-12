import { Router } from "express";
import * as registerController from "./register.controller.js";

const registerRouter = Router();

registerRouter.get("/register", registerController.register);
registerRouter.post("/handleRegister", registerController.handleRegister);

export default registerRouter;
