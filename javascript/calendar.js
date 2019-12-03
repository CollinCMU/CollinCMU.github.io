var $ = function (id) { return document.getElementById(id); };

var getMonthText = function(currentMonth) {
    var months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
    return months[currentMonth];
};

var getLastDayofMonth = function(currentMonth) {
    var endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    return endOfMonth.getDate();
};

//dates of sales for the month
var salesDates = [5, 7, 13, 17, 21, 23, 25, 28];

var fillCalendarTable = function(){
    //create date variables
    var d = new Date();
    var month = d.getMonth();
    var year = d.getFullYear();
    var firstDay = (new Date(year, month)).getDay();
    var lastDay = getLastDayofMonth(month);

    //Sets calendar month and year
    $("month_year").innerHTML = getMonthText(month) + " " + year;

    //Fills calendar table
    var tbl = $("calendar");

    var date = 1;
    for (i = 0; i < 6; i++){
        //create new row
        var row = document.createElement("tr");

        for(j = 0; j < 7; j++){
            //create blank day before month starts
            if(i == 0 && j < firstDay || date > lastDay){
                var cell = document.createElement("td");
                var cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            //create day in month
            else {
                var cell = document.createElement("td");
                //adds date to top of day
                var cellText = document.createTextNode(date);
                cell.appendChild(cellText);

                //if day is a sale day, add sale to cell
                for(k = 0; k < salesDates.length; k++){
                    if(date == salesDates[k]){
                        var para = document.createElement("P");
                        para.appendChild(document.createTextNode("\nSALE!"));
                        cell.appendChild(para);
                    }
                }

                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
        if(date > lastDay) break;
    }
}

var showCoupon = function(){
    $("Coupon").style.visibility = "visible";
}

window.onload = function () {
    this.fillCalendarTable();

    $("Couponbutton").onclick = showCoupon;
};