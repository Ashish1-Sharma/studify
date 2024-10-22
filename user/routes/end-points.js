import express from "express";
import User from "../models/user.js";
import { type } from "os";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {userRegistration, userLogin,userGetInfo,userEdit} from "../controllers/user_controller.js"



const router = express.Router();

router.post("/login", userLogin)

router.post('/register', userRegistration)

router.get('/get',userGetInfo)

router.post('/edit',userEdit)

export default router;