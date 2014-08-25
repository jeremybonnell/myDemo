/**
 * Created by jeremy.bonnell on 8/20/2014.
 */

ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
    ContactsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {

            // Any URL with the fragment "contacts", will get routed to the "listContacts" callback function of ContactsApps module (in list_controller.js)
            // Above stmt may or may not have any merit. it is my assumption.

//            Note that the callback function (e.g. listContacts) specified in the appRoutes object above must exist in the router’s controller.
//            In other words, all the callbacks used in the appRoutes object must be located in our API object.
            "contacts": "listContacts",
            "contacts/:id": "showContact",
            "contacts/:id/edit": "editContact"
        }
    });

    var API = {
        // Question: Do these functions have to be named the same as the ones in the respective controllers?
        //           They currently are... But is it necessary??? Try it out sometime.
        // Answer:   No...! No they don't!!! Just done for consistency.
        listContacts: function(){
            //console.log("route to list contacts was triggered");
            ContactsApp.List.Controller.listContacts();
        },
        showContact: function(id){
            ContactsApp.Show.Controller.showContact(id);
        },
        editContact: function(id){
            ContactsApp.Edit.Controller.editContact(id);
        }
    };

    // Handlers: Trigger functions to direct to the correct page.
    ContactManager.on("contacts:list", function(){
        ContactManager.navigate("contacts");
        API.listContacts();
    });
    ContactManager.on("contact:show", function(id){
        ContactManager.navigate("contacts/" + id);
        API.showContact(id);
    });
    ContactManager.on("contact:edit", function(id){
        ContactManager.navigate("contacts/" + id + "/edit");
        API.editContact(id);
    });

//    why are we listening for the “initialize:after” or [on("start"] rather event in other circumstances, instead of using addInitializer?
//    Execution order. We can add initializers with calls to addInitializer, and the provided functions will be executed
//    when the application is running. Then, once all initializers have been run, the [on("start"] event is triggered.

//    the addInitializer method will execute the provided function when the app is running. This means
//    that if the app isn’t yet running, it will wait until the app has started before running the code;
//    but if the app is already running by the time you call addInitializer, the function will be executed immediately.
    ContactManager.addInitializer(function(){
        new ContactsApp.Router({
            controller: API
        });
    });
});
