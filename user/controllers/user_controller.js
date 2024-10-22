import express from "express";
import User from "../models/user.js";
import { type } from "os";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userLogin = async (req,res)=>{
    let {email,password} = req.body
    await User.findOne({email:email}).then(async (user)=>{
        if(user){
            const decodedPassword = await bcrypt.compare(password,user.password)
            console.log(decodedPassword)
            if(decodedPassword){
                const token = jwt.sign({email:email,password:password},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"1h"}) 
                console.log(token)
                res.send("User is exist")
            } else{
                res.send("password is incorrect")
            }
        } else{
            res.send("User is not exist")
        }
    }).catch((err)=>{
        res.send("Something is wrong")
    })
};


const userRegistration = async (req,res)=>{
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        // image:req.body.image,
    });
    try {
        // Save the user to the database
        const savedUser = await user.save(); // Use await to handle the asynchronous operation
        res.status(201).json(savedUser); // Send back the saved user object as a response
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send("Error saving user: " + err.message); // Send an error response
    }
};

const userGetInfo = (req,res)=>{
    User.findOne({_id:req.body.id}).then((user)=>{
        res.send(user)
    })
}

const userEdit = (req,res)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
    }
    User.findOneAndUpdate({_id:req.body.id},newUserData,{new:true}).then((user)=>{
        res.send(user)
    })
}


export {userRegistration, userLogin,userGetInfo,userEdit}

