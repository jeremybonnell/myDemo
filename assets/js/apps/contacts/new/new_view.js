/**
 * Created by jeremy.bonnell on 9/4/2014.
 */

ContactManager.module("ContactsApp.New", function(New, ContactManager, Backbone, Marionette, $, _){
    New.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
        title: "New Contact"

        // Notice there is no initialize() function like Edit has. Figure out what significance this has.
        // Answer: It's because we don't need to initialize the fields with the current data... There is none yet.
    });
});