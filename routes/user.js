
const express = require("express");

const router = express.Router();

const User = require("../models/user");
//get data all
router.get('/', async (req,res) => {
     try{
        const user = await User.find()
        res.json(user)
     }catch (err) {
        //code 500 means there are an error in server
        //so will be a failure on database transaction
        res.status(500).json({message: err.message})

     };
})
//getting one
router.get('/:id',getUser, (req,res) => {
    //give an access to id params
    res.send(res.user)    
})
//creaating one
router.post('/', async (req,res) => {
    const user = new User({
        name : req.body.name,
        username : req.body.username,
        password : req.body.password,
    })
    try{
        const newUser = await user.save()
        //using 201 for spesific post or creating something new
        res.status(201).json(newUser)
    }catch (err){
        //using 400 because if there one of the input is wrong the respon will be error
        //but doesn't error on server
        res.status(400).json({message: err.message})
    }
})
//updating one
router.patch('/:id', getUser, async (req,res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    }catch(err){
        res.status(400).json({message : err.message})
    }
    
    
})
//deleting one
router.delete('/:id',getUser, async (req,res) => {
    try{
        await res.user.remove()
        res.json({message:"Deleted User"})
    }catch(err){
        res.status(500).json({ message: err.message})
    }
})

async function getUser(req,res,next) {
    let user
    try{
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message:"Cannot find user"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

module.exports = router;