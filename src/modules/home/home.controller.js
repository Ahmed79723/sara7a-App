import { errorHandler } from "../../middleWares/errorHandler.js";

// ~=====================================|home page|===================================================
const home = errorHandler(async (req, res, next) => {
  res.render("home.ejs", { session: req.session });
});

export { home };
