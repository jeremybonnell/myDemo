/**
 * Created by jeremy.bonnell on 8/19/2014.
 */
ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Controller = {
        showContact: function(id){
            var contacts = ContactManager.request("contact:entities");
            var model = contacts.get(id);
            var contactView = new Show.Contact({
                model: model
            });
            // Not worrying about console.log anymore. Let's show the view
            //console.log("showContact called for model ", model)

            ContactManager.mainRegion.show(contactView);
        }
    }
});