import { Router } from "express";
import * as userController from "./user.controller.js";

const userRouter = Router();
// ?=====================================|user page|===================================================
userRouter.get("/user/:id", userController.user);
userRouter.post("/sendMsg/:id", userController.sendMsg);
userRouter.get("/logOut", userController.logOut);

export default userRouter;
