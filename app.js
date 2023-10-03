//Import Express & Database function to connect
const express = require("express");
var cors = require("cors");

const dbConn = require("./Config/dbConn");
const personSchema = require("./modeles/person");
require("dotenv").config();

//Define port number and express module
const port = process.env.PORT;
const app = express();

//Use json to be able to read json files
app.use(express.json());
app.use(cors());
dbConn();

app.post("/addPerson", async (req, res) => {
  try {
    const newPerson = new personSchema(req.body);
    await newPerson.save();
    res.status(200).send("person created successfully");
  } catch (error) {
    res.status(500).send("unable to add new person");
    console.log(error);
  }
});

app.get("/getPersons", async (req, res) => {
  try {
    const persons = await personSchema.find();
    res.status(200).send(persons);
  } catch (error) {
    res.status(500).send("cannot get persons");
    console.log(error);
  }
});

app.get("/getpersonbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await personSchema.findById(id);
    person
      ? res.status(200).send(person)
      : res.status(404).send("person not found");
  } catch (error) {
    res.status(500).send("cannot get person");
    console.log(error);
  }
});
app.put("/updatepersonbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    personSchema
      .findByIdAndUpdate(id, req.body,{returnOriginal: false})
      .then((result) => {
        result? res.status(200).send({result:"updated",data:result}):res.status(400).send({result:"not found",data:result})
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(500).send("cannot update person");
    console.log(error);
  }
});

app.delete("/deletepersonbyid/:id",async (req, res) => {
  try {
    const { id } = req.params;
    personSchema
      .findByIdAndDelete(id)
      .then((result) => {
       result? res.status(200).send({result:"deleted",data:result}):res.status(400).send({result:"not found",data:result})
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(500).send("cannot delete person");
    console.log(error);
  }
})
//Start our server
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`server running on.. http://localhost:${port}`);
});
