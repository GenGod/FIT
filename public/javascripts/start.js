define(['backbone', 'jquery'], function(baseModel, View, backbone, $) {

    var collection = new CommentsCollection();
//Инициализация коллекции моделей данными из БД
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "/",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                for (var a in data) {
                    var dateStamp = getDateStamp(+data[a].time);
                    //console.log(dateStamp);
                    var i = new Comment({
                        userName: data[a].userName,
                        theme: data[a].theme,
                        comment: data[a].comment,
                        dateStamp: dateStamp
                    });
                    //console.log(i);
                    collection.add(i);
                }
            },
        });
    });
//console.log(collection.models.length);
    var commentsView = new CommentsView({collection: collection});
    if (commentsView)
        console.log("commentsView");
    $("#comments").append(commentsView.render().el);
});