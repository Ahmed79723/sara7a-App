import homeRouter from "./home/home.routes.js";
import loginRouter from "./login/login.routes.js";
import messagesRouter from "./messages/messages.routes.js";
import registerRouter from "./register/register.routes.js";
import userRouter from "./user/user.routes.js";

export const globalRoutes = (app) => {
  app.use(homeRouter);
  app.use(loginRouter);
  app.use(registerRouter);
  app.use(messagesRouter);
  app.use(userRouter);
};
