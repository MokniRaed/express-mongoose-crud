//Import Express & Database function to connect
const express = require("express");
const bcrypt = require("bcrypt");
var cors = require("cors");

const dbConn = require("./Config/dbConn");
const personSchema = require("./modeles/person");
const userSchema = require("./modeles/user");
require("dotenv").config();

//Define port number and express module
const port = process.env.PORT;
const app = express();

//Use json to be able to read json files
app.use(express.json());
app.use(cors());
dbConn();

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  userSchema.findOne({ email }).then((chekedUser) => {
    if (chekedUser) {
      bcrypt.compare(password, chekedUser.password, function (err, result) {
        result
          ? res.status(200).send("connected")
          : res.status(401).send("Check your password");
      });
    } else {
      res.status(400).send("try to register first or check your email");
    }
  });
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  userSchema.findOne({ email }).then((checkedUser) => {
    console.log(checkedUser);
    if (checkedUser) {
      res.status(200).send("email already used !");
    } else {
      const newUser = new userSchema(req.body);

      const saltRounds = 10;

      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          newUser.password = hash;
          newUser
            .save()
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((error) => {
              res.status(500).send("unable to register user");
              console.log(error);
            });
        });
      });
    }
  });
});

app.post("/addPerson", async (req, res) => {
  try {
    const newPerson = new personSchema(req.body);
    newPerson.save().then((result) => {
      console.log(result);
      res.status(200).send(result);
    });
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
      .findByIdAndUpdate(id, req.body, { returnOriginal: false })
      .then((result) => {
        result
          ? res.status(200).send({ result: "updated", data: result })
          : res.status(400).send({ result: "not found", data: result });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(500).send("cannot update person");
    console.log(error);
  }
});

app.delete("/deletepersonbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    personSchema
      .findByIdAndDelete(id)
      .then(async (result) => {
        const newPersonsList = await personSchema.find();
        result
          ? res.status(200).send(newPersonsList)
          : res.status(400).send({ result: "not found", data: result });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(500).send("cannot delete person");
    console.log(error);
  }
});
//Start our server
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(`server running on.. http://localhost:${port}`);
});
