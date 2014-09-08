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

            // Layouts within the List View (Separate regions)
            var contactsListLayout = new List.Layout();
            var contactsListPanel = new List.Panel();

            // List.Contacts object is defined in list_view.js (inherits from Marionette.CollectionView)
            $.when(fetchingContacts).done(function(contacts) {
                var contactsListView = new List.Contacts({
                    collection: contacts
                });

                // This function is automatically invoked once the Layout is done rendering. Kinda like the .on("start) function does.
                contactsListLayout.on("show", function(){
                    contactsListLayout.panelRegion.show(contactsListPanel);     // SHOVE contactsListPanel IN (houses the button)
                    contactsListLayout.contactsRegion.show(contactsListView);   // THEN SHOVE contactsListView IN (houses the contacts)
                });

                // Create New Contact Handler
                contactsListPanel.on("contact:new", function() {
                    var newContact = new ContactManager.Entities.Contact();

                    var view = new ContactManager.ContactsApp.New.Contact({
                        model: newContact,
                        asModal: true
                    });

                    view.on("form:submit", function (data) {
                        // Uhh... Value of id should actually be determined from DB insert. Okay for now...
                        // Should go to 'POST' because the URL params do not have a '/id' appended to it like Edit does. Edit has '/id' appended in the contacts_app router (I BELIEVE!)
                        // Nope.  It went to 'PUT' Maybe I need to find out where the '/id' is appended and remove that for new contacts.
                        // OKAY! I GOT IT TO WORK! Just don't set data.id like done below. If it has no... Ugh. Ok. Hold on... It works but has an error. That's because it actually
                        // tried to put an undefined id in the URL. It failed because it's undefined (error), but then went to 'POST' because the part of the tag was just never added...
                        // BOOOOOO!
                        // It actually worked, but the page didn't refresh, showing the new contact, because of the error.
                        // Dang! Also, displaying a view depends on .id not being undefined. So even though I had Node figure out the id, I set it to 0 below,
                        // just to display correctly. Then it fetches them all anyway and gets the real id. Should figure out how to get the new id from the response though.

                        // TODO: READ THIS SECTION
                        // Okay. I finally got it down, but... I need to be able to get the new Id from the response and not calculate it on both sides.
                        // Also, if I am extending from something without default value of id set (since I default it to 'undefined', maybe it would be
                        // better to extend from this class and add id in my new class.. But, ugh. It really just needs id... I think there was a problem with
                        // his logic then, because this issue really has nothing to do with Node.js VS. LocalStorage. This was a WebApp thing with his implementation
                        // not defining an id to begin with. I'll look into it...
                        // TODO: BEGIN...
                        // Strip out id setting once ServiceStack Service is incorporated through Node.js ->
                        // NEED TO GET FROM THE RESPONSE OBJECT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // But that would make it synchronous... And that's not good. Maybe some calls should be synchronous though.
                        /*
                         *
                         */
//                        // Original id set from book.
//                        //Put into myServer.js to simulate the behavior or the Service interacting with the DB.
//                        if (contacts.length > 0) {
//                            var highestId = contacts.max(function (c) { return c.id; }).get("id");
//                            data.id = highestId + 1;
//                        }
//                        else { data.id = 1; }
                        var newId = 0;
                        if (contacts.length > 0) {
                            var highestId = contacts.max(function (c) { return c.id; }).get("id");
                            newId = highestId + 1;
                        }
                        else { newId = 1; }
                        // TODO: END...

                        if (newContact.save(data)) {
                            data.id = newId;
                            newContact.id = newId;
                            contacts.add(newContact);
                            ContactManager.dialogRegion.empty(); //.close is deprecated, use .empty()
                            contactsListView.children.findByModel(newContact).flash("success");
                        }
                        else {
                            view.triggerMethod("form:data:invalid", newContact.validationError);
                        }
                    });
                    ContactManager.dialogRegion.show(view);
                });

                // Signature of "contact:show" but (all lowercase) say which element type within the collection should be invoking this function.
                // since itemview is deprecated, we use childView or childview rather...
                // (the elements defined and contained within the List.Contacts - Marionette.CompositeView).

                // Called with a trigger now instead of an event that, by default, passes args AND are stopped with preventDefault and stopPropagation.
                // args is an object that holds the view, model, and collection. We used to just send model when the function was invoked with an event.
                contactsListView.on("childview:contact:show", function (childView, args) {
//                // called by show button click event, app does not restart so ContactManager.on("start",...) not called
//                // and therefore, does NOT go through router. So append "contacts/id" to the URL.
//                ContactManager.navigate("contacts/" + model.get("id"));
//                // Controller calling a controller
//                ContactManager.ContactsApp.Show.Controller.showContact(model);

                    // Make DRY by triggering the new "contact:show" function in contacts_app.js routing controller.
                    // Different signature than the function we're currently in... 2nd Parameter id instead of model.
                    ContactManager.trigger("contact:show", args.model.get("id"));
                });

                // Called with a trigger now instead of an event that, by default, passes args AND are stopped with preventDefault and stopPropagation.
                // args is an object that holds the view, model, and collection. We used to just send model when the function was invoked with an event.
                contactsListView.on("childview:contact:edit", function(childView, args){
                    var model = args.model;
                    var view = new ContactManager.ContactsApp.Edit.Contact({
                        model: model,
                        asModal: true
                    });

                    // Attach a save method to the list_controller when opened within the modal window.
                    // Would be nice to have all Edit code in one area and just have an option to render as a default page or modal window, instead
                    // of duplicating code in list_controller & edit_controller... Hopefully he addresses this within the context of this book!!!
                    view.on("form:submit", function(data){
                        if(model.save(data)){
                            childView.render();
                            //ContactManager.dialogRegion.close(); // .close() DEPRECATED {use .empty()}
                            ContactManager.dialogRegion.empty();
                            childView.flash("success");
                        }
                        else{
                            view.triggerMethod("form:data:invalid", model.validationError);
                        }
                    });

                    ContactManager.dialogRegion.show(view);
                });

                // Called with a trigger now instead of an event that, by default, passes args AND are stopped with preventDefault and stopPropagation.
                // args is an object that holds the view, model, and collection. We used to just send model when the function was invoked with an event.
                contactsListView.on("childview:contact:delete", function (childView, args) {
                    //contacts.remove(model);
                    args.model.destroy();
                });

                ContactManager.mainRegion.show(contactsListLayout);
            });
        }
    }
});