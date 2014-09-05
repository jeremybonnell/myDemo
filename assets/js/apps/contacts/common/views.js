/**
 * Created by jeremy.bonnell on 9/4/2014.
 */

// Since this common view will deal with contact forms, it should belong to the ContactsApp module and not
// the whole ContactManager Application! Notice the path to where this file is stored to limit availability.

// Also, Since the AddNewContact view is almost IDENTICAL to the EditView, they will both Extend from this.
// Notice the only difference from this Common View and the old Edit View is:
// * Module domain: ContactApp.Common.Views, The Name View Name: Views.Form.
// * The initialize: function has been stripped out.
// * Any view that will extend from this will have it's own initialize(), Can send their own title, etc...
// * Any view that extends from this will not define their template. It is defined here as template: "#contact-form"

ContactManager.module("ContactsApp.Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _){
    Views.Form = Marionette.ItemView.extend({
        template: "#contact-form",

        events: {
            "click button.js-submit": "submitClicked"
        },

        submitClicked: function(e){
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

        // WHEN DOES THIS GET CALLED??? IS IT AUTOMATICALLY INVOKED???
        // Gets called automatically, if defined in my code, from backbone-marionette.js show() function... when:
        // ContactManager.mainRegion.show(view); {is called in edit_controller.js} AND
        // ContactManager.dialogRegion.show(view); {is called in list_controller.js} for new modal
        // ContactManager.dialogRegion.show(view); {is called in list_controller.js} for edit modal
        onRender: function(){
            if( ! this.options.asModal){
                var $title = $("<h1>", { text: this.title });
                this.$el.prepend($title);
            }
        },

        onShow: function(){
            if(this.options.asModal){
                this.$el.dialog({
                    modal: true,
                    title: this.title,
                    width: "auto"
                });
            }
        },

        // Marionette Magic trigger function
        // Remember that triggerMethod will automatically execute a function whose name corresponds to the event. There’s nothing else
        // for us to do: provided we name the function correctly, Marionette will execute it.
        // view.triggerMethod("form:data:invalid", contact.validationError); in edit_controller.js  AND
        // view.triggerMethod("form:data:invalid", newContact.validationError); in list_controller.js
        onFormDataInvalid: function(errors){
            var $view = this.$el;

            var clearFormErrors = function(){
                var $form = $view.find("form");
                $form.find(".help-inline.error").each(function(){
                    $(this).remove();
                });
                $form.find(".control-group.error").each(function(){
                    $(this).removeClass("error");
                });
            }

            var markErrors = function(value, key){
                var $controlGroup = $view.find("#contact-" + key).parent();
                var $errorEl = $("<span>", { class: "help-inline error", text: value });
                $controlGroup.append($errorEl).addClass("error");
            }

            //Don't really need () after parameterLess functions, but do so I know it's a function.
            clearFormErrors();
            // Underscore’s each method (Register any new errors
            _.each(errors, markErrors);
        }
    });
});
