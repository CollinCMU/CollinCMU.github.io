var $ = function (id) { return document.getElementById(id); };

window.onload = function () {
    $("submit").onclick = verify;
    $("addinv").onclick = process;
    initArrays();
    fillProducts();
    fillTable();
}

//admin info
var aName = "admin";
var aPass = "root";

//verifies user/pass fields
var verify = function () {
    var uname = $("uname").value;
    var upass = $("pass").value;

    //correct login
    if (uname == aName && upass == aPass) {
        $("loginwindow").style.display = "none";
        $("admintools").style.display = "block";
    }
    //incorrect login
    else {
        $("uname").value = "";
        $("pass").value = "";
        $("uname").focus();
    }
}

//fills product selection
var fillProducts = function () {
    var productField = $("products");

    itemName.forEach(function (name, index) {
        var opt = document.createElement('option');
        opt.innerHTML = name;
        opt.value = index;
        productField.options.add(opt);
    });
}

//Declare arrays
var itemName = Array();
var itemPrice = Array();
var itemQty = Array();
var itemExt = Array();

var arrArrays = Array();
arrArrays[0] = itemName;
arrArrays[1] = itemPrice;
arrArrays[2] = itemQty;
arrArrays[3] = itemExt;

//populates arrays with data
function initArrays() {
    itemName[0] = "Crowbar";
    itemName[1] = "Drill";
    itemName[2] = "Hammer";
    itemName[3] = "Pliers";
    itemName[4] = "Saw";
    itemName[5] = "Scissors";
    itemName[6] = "Screwdriver";
    itemName[7] = "Socket Wrench";
    itemName[8] = "Wrench";

    itemPrice[0] = 9.99;
    itemPrice[1] = 29.95;
    itemPrice[2] = 14.99;
    itemPrice[3] = 4.99;
    itemPrice[4] = 9.99;
    itemPrice[5] = 4.99;
    itemPrice[6] = 7.99;
    itemPrice[7] = 19.99;
    itemPrice[8] = 11.99;

    itemQty[0] = 7;
    itemQty[1] = 11;
    itemQty[2] = 18;
    itemQty[3] = 16;
    itemQty[4] = 9;
    itemQty[5] = 13;
    itemQty[6] = 23;
    itemQty[7] = 14;
    itemQty[8] = 17;

    totalPrice();
}

//method to update total price (qty * price) of an item
function totalPrice() {
    itemExt[0] = (itemPrice[0] * itemQty[0]).toFixed(2);
    itemExt[1] = (itemPrice[1] * itemQty[1]).toFixed(2);
    itemExt[2] = (itemPrice[2] * itemQty[2]).toFixed(2);
    itemExt[3] = (itemPrice[3] * itemQty[3]).toFixed(2);
    itemExt[4] = (itemPrice[4] * itemQty[4]).toFixed(2);
    itemExt[5] = (itemPrice[5] * itemQty[5]).toFixed(2);
    itemExt[6] = (itemPrice[6] * itemQty[6]).toFixed(2);
    itemExt[7] = (itemPrice[7] * itemQty[7]).toFixed(2);
    itemExt[8] = (itemPrice[8] * itemQty[8]).toFixed(2);
}

//processes inventory additions
var process = function () {
    var qty = $("prodqty").value;

    if (isNaN(qty) || qty == "") {
        $("prodqty").value = "";
    }
    else {
        //adds qty to selected item
        itemQty[$("products").options.selectedIndex] += parseInt(qty);
        totalPrice();
        $("prodqty").value = "";
        //update table
        var old = $("itemTable").tBodies[1];
        $("itemTable").removeChild(old);
        fillTable();
    }
}

//Generates the table and appends it to document
function fillTable() {
    var tblBody = document.createElement("tbody");

    //creates 10 rows
    for (i = 0; i < itemName.length; i++) {
        var row = document.createElement("tr");

        for (j = 0; j < arrArrays.length; j++) {

            var cell = document.createElement("td");

            cell.appendChild(document.createTextNode(arrArrays[j][i]));

            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    $("itemTable").appendChild(tblBody);
}

//sorts the table
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    table = $("itemTable");
    switching = true;

    //sorting direction
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            //If sorting item names (0 = first column)
            if (n == 0) {
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else { //sorts numbered data columns
                if (dir == "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (dir == "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }

            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        }
        else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}