//! =====================================|programmatic error handling|===================================================
process.on("uncaughtException", (err) => {
  console.log("error in code", err);
});
import "dotenv/config";
import express from "express";
import { globalRoutes } from "./src/modules/globalRoutes.js";
import { AppError } from "./src/utils/appError.js";
import { globalErrorMW } from "./src/middleWares/globalErrorMW.js";
import session from "express-session";
import cors from "cors";
import path from "path";
import mongoSession from "connect-mongodb-session";
// var MongoDBStore = require('connect-mongodb-session')(session);
import { dbConnection } from "./dataBase/dbConnection.js";

const app = express();
const port = process.env.PORT || 3017;
let MongoDBStore = mongoSession(session);
let store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.cloud_DB_user}:${process.env.cloud_DB_pass}@e-commerce.j07rt.mongodb.net/sara7a_APP`,
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
app.use(express.static(path.join(path.resolve(), "public")));
// app.use(express.static("public"));
//& ========================================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
globalRoutes(app);
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
