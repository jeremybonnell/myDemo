/**
 * Created by jeremy.bonnell on 8/15/2014.
 */

ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){

    // Define and instantiate the view for each individual Model within a CollectionView
    List.Contact = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#contact-list-item",

        events: {
            "click": "highlightName",
            "click button.js-delete": "deleteClicked"

            // use function above to stop propagation (Do not highlight the row if click on the button itself)
            // "click button": function(){ alert("delete button was clicked"); }
        },

        highlightName: function(e) {
            var itemClicked = $(e.target);
            var itemText = itemClicked.text();

            // Comment out the alert that called the public function:
            // ContactManager.Entities.alertPublicMsg(itemText);

            this.$el.toggleClass("warning");    // row elements currently have to class. Click would toggle (default <-> warning)
        },

        deleteClicked: function(e) {
            e.stopPropagation();
            this.trigger("contact:delete", this.model); // route to function with "contact:delete" signature

            // Remove alert and actually delete the item from the model.
            // alert("delete button was clicked");
        },

        // Now Fade AND actually remove thyself...
        remove: function() {
            var self = this;
            this.$el.fadeOut(function() {
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });

    // Define and Instantiate a Marionette CollectionView object
    // which contain the objects of type List.Contact
    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",                       //surround with <ul/>, Our template is of tag type <li/>
        className: "table table-hover",
        template: "#contact-list",
        childView: List.Contact,                // (DEPRECATED: itemView), use childView
        childViewContainer: "tbody",             // (DEPRECATED: itemViewContainer), use childViewContainer

        // Marionette MAGIC!
        // Since contactsListView gets affected when a delete button is pressed and it is the view for List.Contacts
        // contactsListView.on("childview:contact:delete", is called...
        // WELL! If we name a function according to the signature of the above function call, it will automatically be triggered
        // When the callback function above completes...

        // i.e. contactsListView.on("childview:contact:delete" ====> onChildviewContactDelete
        // (just CAP the beginning letter of each event name section)
        // FREAKING AWESOME!

        onChildviewContactDelete: function() {
            this.$el.fadeOut(1000, function () {
                $(this).fadeIn(1000);
            });
        }
    });
});
