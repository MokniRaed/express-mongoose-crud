//Import Express & Database function to connect
const express = require("express");
const dbConn = require("./Config/dbConn");
const personSchema = require("./modeles/person");
//Define port number and express module
const port = 5000;
const app = express();

//Use json to be able to read json files
app.use(express.json());
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
//Start our server
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`server running on.. http://localhost:${port}`);
});
