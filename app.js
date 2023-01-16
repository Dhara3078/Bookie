

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

import postRouter from "./routes/post-routes.mjs";
import userRouter from "./routes/user-routes.mjs";
import auth from "./routes/auth.mjs";
const app = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/user",userRouter);
app.use("/post",postRouter);


mongoose.connect(process.env.MongoDB_Connection_Link, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to the db");
}).catch((err) => {
    console.log(err + " not connected to db");
});

app.get("/", auth, function(req,res){
  if(res.statusCode != 401){
    res.redirect("/user/home");
  }
   res.render("welcome_page");
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/thankyou", function(req, res){
  res.render("thankyou");
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});





