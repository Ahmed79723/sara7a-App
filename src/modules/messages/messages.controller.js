import { Message } from "../../../models/messages.model.js";
import { errorHandler } from "../../middleWares/errorHandler.js";
import QRCode from "qrcode";
// ~=====================================|messages page|===================================================
const messages = errorHandler(async (req, res, next) => {
  // ^==============================BROWSER COOKIES AUTH===================================
  // console.log(req.get("cookie"));
  // if (req.get("cookie")) {
  //   res.render("messages.ejs");
  // } else {
  //   res.redirect("/login");
  // }
  // ^==============================EXPRESS-SESSION AUTH===================================
  // With promises
  let url = `${req.protocol}://${req.get("host")}/user/${req.session.userId}`;
  let qrCodeUrl;
  await QRCode.toDataURL(url)
    .then((url) => {
      qrCodeUrl = url;
      // console.log(url);
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log(req.session);
  let messages = await Message.find({ user: req.session.userId });
  if (req.session.isLoggedIn) {
    res.render("messages.ejs", {
      session: req.session,
      url,
      qrCodeUrl,
      messages,
    });
  } else {
    res.redirect("/login");
  }
});

export { messages };
