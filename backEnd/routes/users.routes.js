const express = require('express');
const { getAllUsers, addUser, getOneUser, deleteOneUser, addBalance, updateBalance, addRemoveItems, addItems } = require('../controllers/user.controller');
const routes = express.Router();





routes.get('/user', getAllUsers)
routes.get('/user/:id', getOneUser)
routes.delete('/user/:id', deleteOneUser)
routes.post("/user", addUser)
routes.put("/user/:id", updateBalance)
routes.put("/user/items/:id", addItems)







module.exports = routes;