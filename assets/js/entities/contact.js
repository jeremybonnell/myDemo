/**
 * Created by jeremy.bonnell on 8/15/2014.
 */

ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){

//    // private alert function
//    var alertPrivate = function(message) {
//        alert("Private alert: " + message);
//    };
//
//    // public alert function
//    Entities.alertPublic = function(message) {
//        alert("I will now call alertPrivate");
//        alertPrivate(message);
//    };
//
//    // call public alert function
//    Entities.alertPublic("Hello");

    /**
     *  ---------------------------------------------------------------------------------------------
     *  No longer tied to application (i.e. ContactManager.Contact now becomes Entities.Contact. Accessible throughout application.
     */

    // Define and Instantiate a single Contact Model object
    Entities.Contact = Backbone.Model.extend({});

    // Define and Instantiate a Backbone Collection of Contact Model objects
    Entities.ContactCollection = Backbone.Collection.extend({
        model: Entities.Contact,
        comparator: function(contact) {
            return contact.get("firstName") + " " + contact.get("lastName"); // Actually works w/o whitespace.
        }
    });

    // Instantiate the Model Collection Object - contacts
    var contacts;
    var initializeContacts = function() {
        contacts = new Entities.ContactCollection([
            { id: 1, firstName: "Alice", lastName: "Tampen", phoneNumber: "555-0163" },
            { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0184" },
            { id: 3, firstName: "Alice", lastName: "Artsy", phoneNumber: "555-0129" },
            { id: 4, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0117" },
            { id: 5, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0192" },
            { id: 6, firstName: "Alice", lastName: "Smith", phoneNumber: "555-0135" }
        ]);
    };

    // Realistically foo should be its own entity
    var foo;
    //foo.comparator = "lastName";  // No go. Could probably use with another model where comparator was not already defined
    var initializeFoo = function() {
        foo = new Entities.ContactCollection([
            { id: 1, firstName: "Tom", lastName: "Tampa", phoneNumber: "555-0163" },
            { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0184" },
            { id: 3, firstName: "Jillian", lastName: "Fartsy", phoneNumber: "555-0129" },
            { id: 4, firstName: "Cassius", lastName: "Clay", phoneNumber: "555-0117" },
            { id: 5, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0192" },
            { id: 6, firstName: "Cynthia", lastName: "Behemoth", phoneNumber: "555-0135" }
        ]);
    };

    /**
     * API object to contain the functions we will allow the rest of the application to use.
     * Note: The getContactEntities function isn’t technically public because it’s not attached to the Entities module.
     * This is by design, since we want to force the rest of the application to get the contacts by using a request.
    */
    var API =
    {
        getContactEntities: function () {
            if (contacts === undefined) {
                initializeContacts();
            }
            return contacts;
        },

        // Realistically foo should be its own entity
        getFooEntities: function () {
            if (foo === undefined) {
                initializeFoo();
            }
            return foo;
        }
    };

    // Can have multiple resres setHandlers(). The parameter is used to map with request we require.
    ContactManager.reqres.setHandler("contact:entities", function(){
        return API.getContactEntities();
    });

    // Realistically foo should be its own entity
    ContactManager.reqres.setHandler("foo:entities", function(){
        return API.getFooEntities();
    });
});


