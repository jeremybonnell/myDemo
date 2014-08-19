/**
 * Created by jeremy.bonnell on 8/15/2014.
 */

// We declare this sub-module as 'ContactsApp.List' with 'List' parameter so this file is aware of the items
// within list_view.js and can actually have access to variables and objects created within the file. We see
// this when instantiating a List.Contacts object that was defined in list_view.js.

ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = { // List.Controller is the controller object
        listContacts: function () {
            var contacts = ContactManager.request("contact:entities");

            // List.Contacts object is defined in list_view.js (inherits from Marionette.CollectionView)
            var contactsListView = new List.Contacts({
                collection: contacts
            });

            // Signature of "contact:delete" but (all lowercase) say which element type within the collection should be invoking this function.
            // since itemview is deprecated, we use childView or childview rather...
            // (the elements defined and contained within the List.Contacts - Marionette.CompositeView).

            contactsListView.on("childview:contact:show", function(childView, model) {

                // Controller calling a controller
                ContactManager.ContactsApp.Show.Controller.showContact(model);
            });

            contactsListView.on("childview:contact:delete", function(childView, model) {
                contacts.remove(model);
            });

            ContactManager.mainRegion.show(contactsListView);
        }
    }
});