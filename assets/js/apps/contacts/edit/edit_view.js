/**
 * Created by jeremy.bonnell on 8/25/2014.
 */
ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
    Edit.Contact = Marionette.ItemView.extend({
        template: "#contact-form",

        initialize: function(){
            this.title = "Edit " + this.model.get("firstName") + " " + this.model.get("lastName");
        },

        events: {
            "click button.js-submit": "submitClicked"
        },

        submitClicked: function(e){
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
            //console.log("edit contact");
        },

        // WHEN DOES THIS GET CALLED??? IS IT AUTOMATICALLY INVOKED???
        // Gets called automatically, if defined, in backbone-marionette.js show() function... when:
        // ContactManager.mainRegion.show(view); {is called in edit_controller.js} AND
        // ContactManager.dialogRegion.show(view); {is called in list_controller.js}
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
                })
            }
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
