import { User } from "../../../models/user.model.js";
import { errorHandler } from "../../middleWares/errorHandler.js";

// ~=====================================|add product|===================================================
const register = errorHandler(async (req, res, next) => {
  // console.log(req.query);
  res.render("register.ejs", {
    error: req.query.error,
    session: null,
  });
});
// ~=====================================|handle Register|===================================================
const handleRegister = errorHandler(async (req, res, next) => {
  const isUser = await User.findOne({ email: req.body.email });
  if (isUser) return res.redirect("/register?error=email already exists");
  await User.insertMany(req.body);
  res.redirect("/login");
});
handleRegister;
export { register, handleRegister };
