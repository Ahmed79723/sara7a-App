import { User } from "../../../models/user.model.js";
import { errorHandler } from "../../middleWares/errorHandler.js";

// ~=====================================|login page|===================================================
const login = errorHandler(async (req, res, next) => {
  res.render("login.ejs", { error: req.query.error, session: req.session });
});
// ~=====================================|login page|===================================================
const handleLogin = errorHandler(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  user ?? res.redirect("/login?error= wrong email or password");
  // res.setHeader("set-cookie", "userId=" + user._id);
  req.session.userId = user._id;
  req.session.isLoggedIn = true;
  req.session.name = user.name;

  !user || res.redirect("/messages");
});

export { login, handleLogin };
