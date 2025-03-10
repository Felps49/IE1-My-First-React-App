import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
console.log("MongoDB URI:", MONGO_CONNECTION_STRING ? "Loaded Successfully" : "Not Loaded");
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));
  
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const {name, job} = req.query;
  userService
    .getUsers(name, job)
    .then((users) => res.json({users_list: users}))
    .catch((err) => res.status(500).send({error: err.message}));
});
  
  app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    userService
      .findUserById(id)
      .then((user) => {
        if(user) {
          res.json(user);
        } else {
          res.status(404).send("Not Found") 
        }
    })
    .catch((err) => res.status(500).send({error: err.message}));
  });
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userService
      .addUser(userToAdd)
      .then((newUser) => res.status(201).json(newUser))
      .catch((err) => res.status(500).send({error: err.message}));
  });
  
  app.delete("/users/:id", (req, res) => {
    const id =req.params.id;
    userService
    .deleteUserById(id)
    .then((user) => {
      if (user) {
        res.status(204).send();
      } else {
        res.status(404).send("Not Found")
      }
    })
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});