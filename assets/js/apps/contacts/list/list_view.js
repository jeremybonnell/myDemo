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
            alert("delete button was clicked");
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
