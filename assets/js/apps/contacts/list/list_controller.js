/**
 * Created by jeremy.bonnell on 8/15/2014.
 */

// We declare this sub-module as 'ContactsApp.List' with 'List' parameter so this file is aware of the items
// within list_view.js and can actually have access to variables and objects created within the file. We see
// this when instantiating a List.Contacts object that was defined in list_view.js.

ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = { // List.Controller is the controller object
        listContacts: function () {
            var loadingView = new ContactManager.Common.Views.Loading();
            ContactManager.mainRegion.show(loadingView);

            var fetchingContacts = ContactManager.request("contact:entities");

            // List.Contacts object is defined in list_view.js (inherits from Marionette.CollectionView)
            $.when(fetchingContacts).done(function(contacts) {
                var contactsListView = new List.Contacts({
                    collection: contacts
                });


                // Signature of "contact:delete" but (all lowercase) say which element type within the collection should be invoking this function.
                // since itemview is deprecated, we use childView or childview rather...
                // (the elements defined and contained within the List.Contacts - Marionette.CompositeView).

                contactsListView.on("childview:contact:show", function (childView, model) {
//                // called by show button click event, app does not restart so ContactManager.on("start",...) not called
//                // and therefore, does NOT go through router. So append "contacts/id" to the URL.
//                ContactManager.navigate("contacts/" + model.get("id"));
//                // Controller calling a controller
//                ContactManager.ContactsApp.Show.Controller.showContact(model);

                    // Make DRY by triggering the new "contact:show" function in contacts_app.js routing controller.
                    // Different signature than the function we're currently in... 2nd Parameter id instead of model.
                    ContactManager.trigger("contact:show", model.get("id"));
                });

                contactsListView.on("childview:contact:edit", function(childView, model){
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model,
                        asModal: true
                    });

                    // HAD HERE ORIGINALLY, BUT AUTHOR SAID IT BELONGS IN THE VIEW OBJECT ITSELF
                    // Edit.Contact in edit_view.js now has an onShow() function. SWEET!
//                    view.on("show", function() {
//                        this.$el.dialog({
//                            modal: true,
//                            title: view.title,
//                            width: "auto"
//                        });
//                    });
                    ContactManager.dialogRegion.show(view);
                });

                contactsListView.on("childview:contact:delete", function (childView, model) {
                    //contacts.remove(model);
                    model.destroy();
                });

                ContactManager.mainRegion.show(contactsListView);
            });
        }
    }
});