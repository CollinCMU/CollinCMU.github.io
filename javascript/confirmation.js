var $ = function (id) { return document.getElementById(id); };

window.onload = function () {
    loadInfo();
}

var loadInfo = function () {
    $("date").innerHTML = sessionStorage.date;
    $("custType").innerHTML = sessionStorage.custtype;
    $("newCust").innerHTML = sessionStorage.newcust;
    $("fname").innerHTML = sessionStorage.fname;
    $("lname").innerHTML = sessionStorage.lname;
    $("phone").innerHTML = sessionStorage.phone;
    $("email").innerHTML = sessionStorage.email;
    $("state").innerHTML = sessionStorage.state;
    $("zip").innerHTML = sessionStorage.zip;
}