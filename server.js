const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hashPass = require('password-hash');
var ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const path = require("path");
const PORT = process.env.PORT || 5000;
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 6393));
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();


if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}


app.post('/api/login', async (req, res, next) =>
{
    var error = '';

    const { login, password } = req.body;

    const db = client.db();

    const result = await db.collection('Users').find({
        UserName: login.toLowerCase()
    }).toArray();
    
    var fn = '';
    var ln = '';
    var email = '';
    var valid = false;
    var usern = '';

    if (result.length > 0 && hashPass.verify(password, result[0].Password))
    {
        fn = result[0].FirstName;
        ln = result[0].LastName;
        email = result[0].Email;
        valid = result[0].Validated;
        usern = result[0].UserName;
    }

    var ret = {
        firstName: fn,
        lastName: ln,
        Email: email,
        UserName: usern,
        Validated: valid,
        error: ''
    };

    res.status(200).json(ret);
});

app.post('/api/Register', async (req, res, next) =>
{
    var error = '';

    const { firstname, lastname, email, login, password } = req.body;
    var hashedPass = hashPass.generate(password);

    const user = {
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        UserName: login.toLowerCase(),
        Password: hashedPass,
        Notes: "",
        Validated: false
    }

    try {
      const db = client.db();
      const result = await db.collection('Users').insertOne(user);
    }
    catch(e) {
      error = "Email/Username already in use";
    }

    var ret = { error: error };
    res.status(200).json(ret);
});
app.listen(6393);