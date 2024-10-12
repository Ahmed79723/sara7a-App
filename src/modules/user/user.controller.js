import { Message } from "../../../models/messages.model.js";
import { errorHandler } from "../../middleWares/errorHandler.js";

// ~=====================================|user page|===================================================
const user = errorHandler(async (req, res, next) => {
  res.render("user.ejs", { userId: req.params.id, session: null });
});
// ~=====================================|send Message|===================================================
const sendMsg = errorHandler(async (req, res, next) => {
  req.body.user = req.params.id;
  await Message.insertMany(req.body);
  res.redirect("/user/" + req.params.id);
});
// ~=====================================|logOut|===================================================
const logOut = errorHandler(async (req, res, next) => {
  req.session.destroy(function(err) {
    // cannot access session here
    res.redirect("/login");
  })
});
export { user, logOut, sendMsg };
