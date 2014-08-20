/**
 * Created by jeremy.bonnell on 8/15/2014.
 */
// Marionette app declaration
var ContactManager = new Marionette.Application();

// Define the html region in which we will populate the CollectionView
ContactManager.addRegions({
    mainRegion: "#main-region"

});

ContactManager.navigate = function(route, options){
    options || (options = {});
    Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function(){
    return Backbone.history.fragment
};

//--------------------Triggered by calling ContactManager.start(); in index.html
// Create On-Start method which
// Defines the events to occur when the application starts, using our pre-defined types.
// Initializing Backbone history is REQUIRED FOR ROUTING!!!
// Could have actually place the guts of this callback function into the one above.
ContactManager.on("start", function() {
    if (Backbone.history) {
        Backbone.history.start();

        // Here’s what we want to do: if the user comes to our app at the root URL, let’s redirect him to “#contacts”. The basic way of accomplishing this would be:
        if(this.getCurrentRoute() === "") {      // triple === in javascript has no type conversion before evaluating. but essentially the same as ==
            ContactManager.trigger("contacts:list");
        }
    }
});