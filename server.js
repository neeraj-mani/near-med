const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const dashboardRouter = require("./routes/dashboard");
const homeRouter = require("./routes/home");
const loginRouter = require("./routes/login");
const registrationRouter = require("./routes/registration");
const shopSetupRouter = require("./routes/shop-setup");
const userAuthRouter = require("./routes/userAuth");
const otpRouter = require("./routes/otp");
const port = process.env.PORT || 3000;
app.use(express.static("./static"));

app.use(bodyParser.json());
app.use(dashboardRouter);
app.use(homeRouter);
app.use(loginRouter);
app.use(registrationRouter);
app.use(shopSetupRouter);
app.use(userAuthRouter);
app.use(otpRouter);
app.use((req, res) => res.sendFile(__dirname + "/views/404Page.html"));

app.listen(port);
