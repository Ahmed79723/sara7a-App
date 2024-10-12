//! =====================================|programmatic error handling|===================================================
process.on("uncaughtException", (err) => {
  console.log("error in code", err);
});
import express from "express";
import { globalRoutes } from "./src/modules/globalRoutes.js";
import { AppError } from "./src/utils/appError.js";
import { globalErrorMW } from "./src/middleWares/globalErrorMW.js";
import session from "express-session";
import cors from "cors";
import path from "path";
import { dbConnection } from "./dataBase/dbConnection.js";

const app = express();
const port = process.env.PORT || 3017;
// var MongoDBStore = require('connect-mongodb-session')(session);
import mongoSession from "connect-mongodb-session";
let MongoDBStore = mongoSession(session);
let store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/sarahah_App",
  collection: "mySessions",
});
app.use(
  session({
    secret: "keyboard category", //key used to encrypt session Id
    resave: false,
    saveUninitialized: true, //used to save session data or remove it from DB
    store,
    // cookie: { secure: true },
  })
);
//& =====================================|options|==========================================
app.use(cors());
app.set("views", path.resolve() + "/views");
app.set("view engine", "ejs");
//& ========================================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), "public")));

// app.use(express.static("public"));
globalRoutes(app);
//? =====================================|default end point|===================================================
// app.get("/", async (req, res) => {
//   res.render("home.ejs");
// });
//^ =====================================|404 end point|===================================================
app.use(
  "*",
  (req, res, next) =>
    next(new AppError(`route not found ${req.originalUrl}`, 404))
  // res.status(404).json({ msg: `route not found ${req.originalUrl}` })
  //^ new AppError(`route not found ${req.originalUrl}`,404)
  //^ this line is the error that is passed to the major where i receive it in the err param of error middle ware
);
//! =====================================|global error handler MW|===================================================
app.use(globalErrorMW);
//! =====================================|error handling outside express|===================================================
process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection", err);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
