/**
 * Created by jeremy.bonnell on 9/2/2014.
 */

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonRequest = require('request-json');
var client = jsonRequest.newClient('http://localhost:12209/')
var redis = require('redis');
var connectRedis = require('connect-redis');

// configure app to use bodyParser()
// this will let us get the data from a POST and PUT
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set our port
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API - get an instance of the express Router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    // console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to my sample api!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/', router); // Not using a prefix with this app
app.use('/templates', express.static('templates'));
app.use('/assets', express.static('assets'));


// don't respond with array obj. security issues.
// Figure out how to pass as an object!!!
// This is just an array that is built in myServer.js to simulate pulling something from the DB.
var dataContainer =
    [{ id: 1, firstName: "Alice", lastName: "Tampen", phoneNumber: "555-0163" },
    { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0184" },
    { id: 3, firstName: "Alice", lastName: "Artsy", phoneNumber: "555-0129" },
    { id: 4, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0117" },
    { id: 5, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0192" },
    { id: 6, firstName: "Alice", lastName: "Smith", phoneNumber: "555-0135" }];

function handleCallback(error, res, callback) {
    if (error) {
        throw error;
    }

    if (callback !== 'undefined') {
        callback(res);
    }
}

app.get("/contacts", function(req, res){
    //var data = json.get('localhost:12209/lease/0');
    res.send(dataContainer);
});

app.get("/contacts/:id", function(req, res){
    var id = parseInt(req.params.id);

    for(var i=0; i<dataContainer.length; i++){
        if (dataContainer[i].id === id){
            return res.send(dataContainer[i]);
        }
    }

//    var contact = { id: id, FirstName: '', LastName: '', PhoneNumber: '' };
//    client.get('lease/' + id.toString(), function (err, response, body) {
//        if (!err) {
//            contact.firstName = body.Client.FirstName;
//            contact.lastName = body.Client.LastName;
//            contact.phoneNumber = body.Client.PhoneNumber;
//            //handleCallback(null, res, callback); //handleCallback(null, AggregateTRX(req, body), callback);
//            return res.send(contact);
//        }
//        else {
//            handleCallback(err, null, callback);
//        }
//    });
});

app.delete("/contacts/:id", function(req, res){
    var id = parseInt(req.params.id);

    for(var i=0; i<dataContainer.length; i++){
        if (dataContainer[i].id === id){
            dataContainer.splice(i, 1);
            break;
        }
    }
    res.send(dataContainer);
});

app.put("/contacts/:id", function(req, res){
    var id = parseInt(req.params.id);

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phoneNumber = req.body.phoneNumber;

    for(var i=0; i<dataContainer.length; i++){
        if (dataContainer[i].id === id){

            if (firstName === undefined){
                break;
            }
            else {
                dataContainer[i].firstName = firstName;
                dataContainer[i].lastName = lastName;
                dataContainer[i].phoneNumber = phoneNumber;
            }
            break;
        }
    }

    // HOW WOULD YOU RETURN A FAILURE VS SUCCESS???
    return res.send(dataContainer);
});

app.post("/contacts", function(req, res){

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phoneNumber = req.body.phoneNumber;
    var id = 1;

//    if (dataContainer.length > 0) {
//        var highestId = dataContainer.max(function (c) { return c.id; }).get("id");
//        id = highestId + 1;
//    }

    if (dataContainer.length > 0) {
        for (var i = 0; i < dataContainer.length; i++) {
            if (dataContainer[i].id > id) {
                id = dataContainer[i].id;
            }
        }
        id += 1;
    }

    var contact = { id: id, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber };

    dataContainer.push(contact)
    return res.send(dataContainer);
});

// can use Port if I want. but will just use 3000 fro now.
app.listen(3000); // app.listen(port);


// HOW WOULD YOU RETURN A FAILURE VS SUCCESS???
// When do we use (res.send(dataContainer) vs. (return res.send(dataContainer))???
// How to Make an array into an object to send in the response.
// Using my own defined objects from Modules??? Like what was done in Mongoose ORM...
// How to connect to MY service, using a URL, hosted by my ServiceStack application. Since I won't actually be accessing any DB in here.
// What is Curl and SoapUI? Should we consider using?
// How to return an id from a 'POST' if you are making asynchronous calls.