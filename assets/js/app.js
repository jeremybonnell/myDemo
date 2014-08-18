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
ContactManager.on("start", function () {
    ContactManager.ContactsApp.List.Controller.listContacts();
});