/**
 * Created by jeremy.bonnell on 8/15/2014.
 */
// Marionette app declaration
var ContactManager = new Marionette.Application();

// Define the html region in which we will populate the CollectionView
ContactManager.addRegions({
    mainRegion: "#main-region"

});

//--------------------Triggered by calling ContactManager.start(); in index.html
// Create On-Start method which
// Defines the events to occur when the application starts, using our pre-defined types.
// Initializing Backbone history is REQUIRED FOR ROUTING!!!
// Could have actually place the guts of this callback function into the one above.
ContactManager.on("start", function() {
    if (Backbone.history) {
        Backbone.history.start();

        // Here’s what we want to do: if the user comes to our app at the root URL, let’s redirect him to “#contacts”. The basic way of accomplishing this would be:
        if(Backbone.history.fragment === "") {      // triple === in javascript has no type conversion before evaluating. but essentially the same as ==
            Backbone.history.navigate("contacts");
            ContactManager.ContactsApp.List.Controller.listContacts();

//        // As a sideNote: Could also use the following line of code instead of the 2 preceding lines...Bad practice though I guess.
//        Backbone.history.navigate("contacts", {trigger: true});
        }
    }
});