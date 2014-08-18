/**
 * Created by jeremy.bonnell on 8/15/2014.
 */

ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){

    // Define and instantiate the view for each individual Model within a CollectionView
    List.Contact = Marionette.ItemView.extend({ tagName: "li", template: "#contact-list-item" });

    // Define and Instantiate a Marionette CollectionView object
    // which contain the objects of type List.Contact
    List.Contacts = Marionette.CompositeView.extend({
        tagName: "div",                       //surround with <ul/>, Our template is of tag type <li/>
        //className: "table table-hover",
        template: "#contact-list-p",
        childView: List.Contact,                //itemView: List.Contact (DEPRECATED: itemView)
        childViewContainer: "ul"                //itemViewContainer: List.Contact (DEPRECATED: childViewContainer)
    });
});
