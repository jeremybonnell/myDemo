/**
 * Created by jeremy.bonnell on 8/25/2014.
 */
ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
    Edit.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
        initialize: function(){
            this.title = "Edit " + this.model.get("firstName") + " " + this.model.get("lastName");
        }
    });
});
