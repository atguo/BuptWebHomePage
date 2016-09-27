var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function get_time(date) {
    var time = date.toTimeString();
    document.getElementById("time").innerHTML = time.split(" ",1)[0];
}

function get_date(date) {
    document.getElementById("date").innerHTML = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate();
}

function get_datetime() {
    var date = new Date();
    get_date(date);
    get_time(date);
}