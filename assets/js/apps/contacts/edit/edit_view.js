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
        },

        // Marionette Magic trigger function
        // Remember that triggerMethod will automatically execute a function whose name corresponds to the event. There’s nothing else
        // for us to do: provided we name the function correctly, Marionette will execute it.

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
                var $errorEl = $("<span>", {class: "help-inline error", text: value});
                $controlGroup.append($errorEl).addClass("error");
            }


            //Don't really need () after parameterLess functions, but do so I know it's a function.

            // Clear Form
            clearFormErrors();
            // Underscore’s each method (Register any new errors
            _.each(errors, markErrors);
        }
    });
});
