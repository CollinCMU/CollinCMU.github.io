var $ = function (id) { return document.getElementById(id); };

window.onload = function () {
    initArrays();
    fillTable();
    $("reset").onclick = resetFields;
}

// #region Methods involving product table

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
    itemName[7] = "Socket_Wrench";
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

//Generates the table and appends it to document
function fillTable() {
    var tblBody = document.createElement("tbody");

    //creates 9 rows
    for (i = 0; i < itemName.length; i++) {
        var row = document.createElement("tr");

        //creates 4 columns
        for (j = 0; j < arrArrays.length; j++) {

            var cell = document.createElement("td");

            //first three columns
            if (j != 3)
                cell.appendChild(document.createTextNode(arrArrays[j][i]));
            //last column is a selection
            else {
                var sel = addSelection(i);
                cell.appendChild(sel);
            }
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    $("itemTable").appendChild(tblBody);
}

//Fills last slot of table with a selection with options = products qty
function addSelection(i) {
    //creates new selection with id = item name
    var select = document.createElement("select");
    select.id = itemName[i];

    //creates options
    for (k = 0; k < itemQty[i] + 1; k++) {
        var opt = document.createElement('option');
        opt.innerHTML = k;
        opt.value = k;
        select.options.add(opt);
    }
    return select;
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

//#endregion 

//reset fields
var resetFields = function () {
    //cust info fields
    $("fname").value = "";
    $("lname").value = "";
    $("email").value = "";
    $("emailtwo").value = "";
    $("zip").value = "";

    //reset product selections
    var selections = document.getElementsByTagName("select");
    for (i = 0; i < selections.length; i++) {
        selections[i].value = 0;
    }
}

function validateForm() {


    if (!isNaN($("fname").value)) {
        alert("First name cannot be a number");
        $("fname").value = "";
        return false;
    }
    else if (!isNaN($("lname").value)) {
        alert("Last name cannot be a number");
        $("lname").value = "";
        return false;
    }
    else if ($("email").value != $("emailtwo").value) {
        alert("Emails must match.");
        $("emailtwo").value = "";
        return false;
    }
    else {
        saveOrder();

        if(sessionStorage.subtotal > 0) return true;

        else {
            alert("You must add products to the order!");
            return false;
        } 
    }
}

//save order info
var saveOrder = function () {
    //save cust info fields
    sessionStorage.setItem("fname", $("fname").value);
    sessionStorage.setItem("lname", $("lname").value);
    sessionStorage.setItem("email", $("email").value);
    sessionStorage.setItem("zip", $("zip").value);

    //save all product selections
    var subtotal = 0.0;
    var selections = document.getElementsByTagName("select");
    for (i = 0; i < selections.length; i++) {
        sessionStorage.setItem(selections[i].id, selections[i].value);

        //inc subtotal price
        subtotal += (selections[i].value * itemPrice[i]);
    }
    //calculate tax/totals
    subtotal = subtotal.toFixed(2);
    var tax = (subtotal * 0.06).toFixed(2);
    var total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
    //set totals/tax in storage
    sessionStorage.setItem("subtotal", subtotal);
    sessionStorage.setItem("tax", tax);
    sessionStorage.setItem("total", total);
}