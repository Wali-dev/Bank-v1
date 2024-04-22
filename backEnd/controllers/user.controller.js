const {v4: uuidv4} = require('uuid');
const Users = require('../models/user.model')




const getAllUsers = async(req, res)=>{
    const allUsers = await Users.find();
    res.send(allUsers);
}

const getOneUser  = async (req, res)=>{
    const id = req.params.id;
    const thatUser = await Users.findOne({id});
    res.send(thatUser)
}

const addUser = async (req, res)=>{
    
    try {
        const newUser = await new Users({
            id: uuidv4(),
            name: req.body.name,
            userID: req.body.userID,
            email: req.body.email,
            age: Number(req.body.age),
            ocupation: req.body.ocu,       
            currentBalance: Number(req.body.currentBalance),    
            lastTransaction: req.body.lastTransaction       
        })
        
        await newUser.save();
        res.json(newUser);

    } catch (error) {
        res.send(error.message)
    }
    
}
const deleteOneUser = async (req, res)=>{
    const id = req.params.id;
    await Users.deleteOne({id});

    res.send("The user is deleted");
}
const updateBalance = async  (req, res)=>{
    try {
        const id = req.params.id; //getting the id from the parameter

        //getting previous balance from the db
        const thatUser = await Users.findOne({id});
        const pastBalance = await thatUser.currentBalance;
        
        //setting transaction amount and adding that with the current Balance

        const lastTransaction = Number(req.body.lastTransaction);
        const currentBalance =  Number(pastBalance+lastTransaction);

        //updating the database
        await Users.updateOne({id}, {$set:{lastTransaction: lastTransaction, currentBalance: currentBalance}})

        
       const updatedUsers = await Users.findOne({id});
       res.send(updatedUsers)
        
    } catch (error) {
        console.log(error.message)
    }
}


const addItems = (req, res)=>{
    res.send("this is the dmo route")
}
const removeItems = (req, res)=>{
    res.send("this is the dmo route")
}















module.exports = {getAllUsers, getOneUser, 
                  addUser, addItems, updateBalance, 
                   deleteOneUser, 
                  removeItems}