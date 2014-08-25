/**
 * Created by jeremy.bonnell on 8/25/2014.
 */
ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
    Edit.Contact = Marionette.ItemView.extend({
        template: "#contact-form",

        events: {
            "click button.js-submit": "submitClicked"
        },

        submitClicked: function(e){
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
            //console.log("edit contact");
        }
    });
});
