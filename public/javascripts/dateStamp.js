/*
 *@params data - дата написания комментария в миллисекундах
 *@return dataStamp - преобразованная дата согласно заданию
 */
function getDateStamp (data) {
    if (+data) {
        var now = new Date();
        var dataDate = new Date(data);
        var hours = now.getHours() - dataDate.getHours();
        if (hours < 0)
            hours += 24;
        var dateStamp;
        if (hours == 0) {
            var minutes = now.getMinutes() - dataDate.getMinutes();
            if (minutes < 0)
                minutes += 60;
            if (minutes == 0) {
                var seconds = now.getSeconds() - dataDate.getSeconds();
                if (seconds < 0) {
                    seconds += 60;
                }
                if (seconds == 0) {
                    dateStamp = "Только что";
                }
                else {
                    if ((seconds % 10) == 1 && seconds != 11) {
                        dateStamp = seconds + " секунду назад";
                    }
                    else if ((seconds % 10) < 5 && (seconds < 10 || seconds > 21)) {
                        dateStamp = seconds + " секунды назад";
                    }
                    else {
                        dateStamp = seconds + " секунд назад";
                    }
                }
            }
            else {
                if ((minutes % 10) == 1 && (minutes != 11)) {
                    dateStamp = minutes + " минуту назад";
                }
                else if ((minutes % 10) < 5 && (minutes < 10 || minutes > 21)) {
                    dateStamp = minutes + " минуты назад";
                }
                else {
                    dateStamp = minutes + " минут назад";
                }
            }
        }
        else if (hours < 24) {
            if ((hours % 10) == 1 && (hours != 11)) {
                dateStamp = hours + " час назад";
            }
            else if ((hours % 10) < 5 && (hours < 10 || hours > 21)) {
                dateStamp = hours + " часа назад";
            }
            else {
                dateStamp = hours + " часов назад";
            }
        }
        else {
            dateStamp = dataDate.getDay() + " " + dataDate.getMonth() + " " + dataDate.getFullYear() + " " + dataDate.getHours() + ":" + dataDate.getMinutes() + ":" + dataDate.getSeconds();
        }
        return dateStamp;
    } else return "";
}