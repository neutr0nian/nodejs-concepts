const PORT = 3000,
  http = require("http-status-codes").StatusCodes,
  express = require("express"),
  router = express.Router(),
  layouts = require("express-ejs-layouts");

const dbUrl =
  "mongodb+srv://root:root@cluster0.nvmgw4a.mongodb.net/recipe_db?retryWrites=true&w=majority";

const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, { useNewUrlParser: true });

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose");
});

const homeController = require("./controllers/homeController");
const usersController = require("./controllers/usersController");
const subscribersController = require("./controllers/subscribersController");
const errorController = require("./controllers/errorController");

const app = express();

app.set("port", process.env.PORT || PORT);

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static("public"));
app.use(layouts);
app.set("view engine", "ejs");
app.use("/", router);

router.get("/", (req, res) => {
  res.send("Welcome to Confetti Cuisine!");
});

router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showSignUp);
router.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  (req, res, next) => {
    console.log(req.data);
    res.render("subscribers", { subscribers: req.data });
  }
);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);

router.post("/contact", homeController.postedSignUpForm);
router.post("/subscribe", subscribersController.saveSubscriber);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);

app.use(errorController.logErrors);
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running on port: ${PORT}`);
});
