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

        // deleteClicked goes to controller which calls remove, but since List.Contact has a remove() override function
        // it actually comes back here (this object's/model's implementation) to call remove. Freaking weird. bobbing back and forth.
        deleteClicked: function(e) {
            e.stopPropagation();
            this.trigger("contact:delete", this.model); // route to function with "contact:delete" signature

            // Remove alert and actually delete the item from the model.
            // alert("delete button was clicked");
        },

//        OVERRIDE JQUERY'S/JAVASCRIPT'S 'Remove' FUNCTION:
//        Marionette calls an item view’s remove method (if it’s defined)
//        when the corresponding model is removed from the collection referenced by the collection/composite view.
//        Since this only calls fadeOut(), the item is not actually being removed. Check the DOM, gives style="display:none"
        // here is the override function for remove()...
        remove: function() {
            this.$el.fadeOut();
        }
    });

    // Define and Instantiate a Marionette CollectionView object
    // which contain the objects of type List.Contact
    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",                       //surround with <ul/>, Our template is of tag type <li/>
        className: "table table-hover",
        template: "#contact-list",
        childView: List.Contact,                // (DEPRECATED: itemView), use childView
        childViewContainer: "tbody"             // (DEPRECATED: itemViewContainer), use childViewContainer
    });
});
