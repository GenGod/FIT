/**
 * Created by Богдан on 21.04.2017.
 */
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "/",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            for (var a in data) {
                var dateStamp = getDateStamp(+data[a].time);
                var text = '<div class=row>' +
                    '<h4 class="h4">' + data[a].userName + '<i class="small">   ' + dateStamp + '</i></h4>' +
                    '<h5 class="h5"><b>' + data[a].theme + '</b></h5><br/>' +
                    '<p class="text-justify">' + data[a].comment + ' </p>' +
                    '<hr>' +
                    '</div>';
                $("#comments").prepend(text);
            }
        },
    });
});