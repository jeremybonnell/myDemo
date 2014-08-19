/**
 * Created by jeremy.bonnell on 8/19/2014.
 */

ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
    Show.Contact = Marionette.ItemView.extend({
        template: "#contact-view"
    });
});