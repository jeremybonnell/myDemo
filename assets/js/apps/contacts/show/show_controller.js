/**
 * Created by jeremy.bonnell on 8/19/2014.
 */
ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Controller = {
        showContact: function(id){
            var contact = ContactManager.request("contact:entity", id);
            var contactView;
            if(contact !== undefined){
                contactView = new Show.Contact({
                    model: contact
                });
            }
            else{
                contactView = new Show.MissingContact();
            }

            // Display the view
            ContactManager.mainRegion.show(contactView);
        }
    }
});