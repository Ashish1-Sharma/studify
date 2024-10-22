import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";  // Import dotenv to load environment variables
// import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();  // Load .env file

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on("error", (error) => console.log("Something is wrong:", error));
db.once("open", () => console.log("Connected to the database"));

// app.use(cors(
//   {
//     origin:"*",
//     credentials:true,
//     optionsSuccessStatus:200
//   }
// ))
// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({secret:'my-secret-key',
    saveUninitialized:true,
    resave:false
}));


app.use(express.json({
  limit:"16kb",
}))

app.use(cookieParser())

// Set Template engine
app.set('view engine','ejs');

// route prefix
import {router as user} from './user/routes/routes.js';
app.use("/user", user);


app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})
app.get("/", (req, res) => {
  res.send("Hello, I am Ashish");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
