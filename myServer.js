/**
 * Created by jeremy.bonnell on 9/2/2014.
 */

var express = require('express');
var app = express();

// don't respond with array obj. security issues.

var dataContainer =
    [
    { id: 1, firstName: "Alice", lastName: "Tampen", phoneNumber: "555-0163" },
    { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0184" },
    { id: 3, firstName: "Alice", lastName: "Artsy", phoneNumber: "555-0129" },
    { id: 4, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0117" },
    { id: 5, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0192" },
    { id: 6, firstName: "Alice", lastName: "Smith", phoneNumber: "555-0135" }
    ];

app.use("/templates", express.static("templates"));
app.use("/assets", express.static("assets"));
app.get("/contacts", function(req, res, next){
    res.send(dataContainer);

});
app.get("/contacts/:id", function(req, res, next){
    var id = parseInt(req.params.id);

    for(var i=0; i<dataContainer.length; i++){
        if (dataContainer[i].id === id){
            return res.send(dataContainer[i]);
        }
    }
    next();
});
//app.del(){
//
//}
app.listen(3000);

