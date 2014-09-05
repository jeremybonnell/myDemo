/**
 * Created by jeremy.bonnell on 8/15/2014.
 */

ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){

    // private alert function
    var alertPrivate = function(message) {
        alert("Private alert: " + message);
    };

    // public alert function
    Entities.alertPublic = function(message) {
        alert("I will now call alertPrivate");
        alertPrivate(message);
    };

    Entities.alertPublicMsg = function(message) {
        alert(message);
    };

    // call public alert function
    //Entities.alertPublic("Hello");

    /**
     *  ---------------------------------------------------------------------------------------------
     *  No longer tied to application (i.e. ContactManager.Contact now becomes Entities.Contact. Accessible throughout application.
     */

    // Define and Instantiate a single Contact Model object
    Entities.Contact = Backbone.Model.extend({
        urlRoot: "/contacts",

        defaults: {                 // Default Values so New.View won't choke if trying to display undefined fields.
            firstName: "",
            lastName: "",
            phoneNumber: "",
            id: undefined       // Book did not declare 'id'. This causes problems on NewContact Creation.
        },                      // Set as undefined so NodeServer knows whether to 'PUT' or 'POST'

        validate: function(attrs, options) {
            var errors = {};
            if (!attrs.firstName) {
                errors.firstName = "can't be blank";
            }
            if (!attrs.lastName) {
                errors.lastName = "can't be blank";
            }
            else if (attrs.lastName.length < 2) {
                errors.lastName = "is too short";
            }
            if(!_.isEmpty(errors)){
                return errors;
            }
        }
    });
    // The only difference between our using web storage instead of a remote server is THIS LINE...
    //Entities.configureStorage(Entities.Contact);

    // Define and Instantiate a Backbone Collection of Contact Model objects
    Entities.ContactCollection = Backbone.Collection.extend({
        url: "/contacts",
        model: Entities.Contact,
        comparator: function(contact) {
            return contact.get("firstName") + " " + contact.get("lastName"); // Actually works w/o whitespace.
        }
    });
    // AND THIS LINE!
    //Entities.configureStorage(Entities.ContactCollection);

    // Instantiate the Model Collection Object - contacts
    var contacts;

//    // NOT USING ANYMORE! WILL BE DONE IN myServer.js using Node.js. BUT WILL HAVE TO FIND A WAY TO SAVE!!!
//    // Build and Save ContactCollections (will only be called if persisted data is empty though.
//    var initializeContacts = function() {
//        var contacts = new Entities.ContactCollection([
//            { id: 1, firstName: "Alice", lastName: "Tampen", phoneNumber: "555-0163" },
//            { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0184" },
//            { id: 3, firstName: "Alice", lastName: "Artsy", phoneNumber: "555-0129" },
//            { id: 4, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0117" },
//            { id: 5, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0192" },
//            { id: 6, firstName: "Alice", lastName: "Smith", phoneNumber: "555-0135" }
//        ]);
//
//        contacts.forEach(function(contact){
//            contact.save();
//        });
//        return contacts.models;
//    };

    /**
     * API object to contain the functions we will allow the rest of the application to use.
     * Note: The getContactEntities function isn’t technically public because it’s not attached to the Entities module.
     * This is by design, since we want to force the rest of the application to get the contacts by using a request.
    */
    var API =
    {
        // Since we don't really have a means to initialize the persisted data, we will store a new list once it is empty.
        getContactEntities: function(){
            var contacts = new Entities.ContactCollection();
            var defer = $.Deferred();
            contacts.fetch({
                success: function (data) {
                    defer.resolve(data);
                }
            });

            var promise = defer.promise();

//            // Using Node.js now... Would have to deal with differently. This is just creating if empty
//            // Will most likely have to deal with in myServer.js...
//            $.when(promise).done(function(contacts) {
//                if (contacts === undefined || contacts.length === 0) {
//                    var models = initializeContacts();
//                    contacts.reset(models); // reset just reloads all items back in to the collection
//                }
//            });
            return promise;
        },

        getContactEntity: function(contactId){
            var contact = new Entities.Contact({id: contactId});
            var defer = $.Deferred();
            setTimeout(function() {
                contact.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(undefined);
                    }
                });
            }, 2000);
            return defer.promise();
        }
    };

    // Can have multiple resres setHandlers(). The parameter is used to map with request we require.
    ContactManager.reqres.setHandler("contact:entities", function(){
        return API.getContactEntities();
    });

    ContactManager.reqres.setHandler("contact:entity", function(id){
        return API.getContactEntity(id);
    });
});


