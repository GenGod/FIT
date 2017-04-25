/**
 * Created by Богдан on 21.04.2017.
 */
/*
 * Метод для обработки формы написания комментариев
 */
$("form").submit(function (e) {
    e.preventDefault();
    //Парсинг полей формы
    var registerForm = document.forms["commentsForm"];
    var userName = registerForm.elements["userName"].value;
    var theme = registerForm.elements["theme"].value;
    var comment = registerForm.elements["comment"].value;
    var time = Date.now().toString();

    //AJAX-запрос, передающий данные формы на сервер
    $.ajax({
        type: "POST",
        url: "/index",
        data: JSON.stringify({userName: userName, theme: theme, comment: comment, time: time}),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            var dateStamp = getDateStamp(+data.time);
            var text = '<div class=row>' +
                            '<h4 class="h4">' + data.userName + '<i class="small">   ' + dateStamp + '</i></h4>' +
                            '<h5 class="h5"><b>' + data.theme + '</b></h5><br/>' +
                            '<p class="text-justify">' + data.comment +' </p>' +
                            '<hr>' +
                            '</div>';
            $("#comments").prepend(text);
        },
    });
});