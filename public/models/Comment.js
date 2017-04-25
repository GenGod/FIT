define(['backbone'], function(backbone) {
    var Comment = Backbone.Model.extend({
        default: {
            userName: "Аноним",
            theme: "Без темы",
            comment: ""
        }
    });

    var CommentsCollection = Backbone.Collection.extend({
        model: Comment
    });
});