var $ = function (id) { return document.getElementById(id); };

window.onload = function () {
    fillInfo();
    addTotals();
}

//#region Product Names array
var itemName = Array();

itemName[0] = "Crowbar(s)";
itemName[1] = "Drill(s)";
itemName[2] = "Hammer(s)";
itemName[3] = "Pliers";
itemName[4] = "Saw(s)";
itemName[5] = "Scissors";
itemName[6] = "Screwdriver(s)";
itemName[7] = "Socket Wrench(s)";
itemName[8] = "Wrench(s)";
//#endregion

var fillInfo = function () {
    //set cust info
    $("fname").innerHTML = sessionStorage.fname;
    $("lname").innerHTML = sessionStorage.lname;
    $("email").innerHTML = sessionStorage.email;
    $("zip").innerHTML = sessionStorage.zip;

    //call function to create label + span
    if (sessionStorage.Crowbar > 0) createItem(0, sessionStorage.Crowbar);
    if (sessionStorage.Drill > 0) createItem(1, sessionStorage.Drill);
    if (sessionStorage.Hammer > 0) createItem(2, sessionStorage.Hammer);
    if (sessionStorage.Pliers > 0) createItem(3, sessionStorage.Pliers);
    if (sessionStorage.Saw > 0) createItem(4, sessionStorage.Saw);
    if (sessionStorage.Scissors > 0) createItem(5, sessionStorage.Scissors);
    if (sessionStorage.Screwdriver > 0) createItem(6, sessionStorage.Screwdriver);
    if (sessionStorage.Socket_Wrench > 0) createItem(7, sessionStorage.Socket_Wrench);
    if (sessionStorage.Wrench > 0) createItem(8, sessionStorage.Wrench);
}

//creates label+span for each item purchased
var createItem = function (i, qty) {
    var field = $("productsOrdered");

    var label = document.createElement("label");
    label.innerHTML = itemName[i];

    var span = document.createElement("span");
    span.innerHTML = qty;

    label.appendChild(span);
    field.appendChild(label);
}

//adds subtotal, tax, and total fields
var addTotals = function () {
    var field = $("productsOrdered");

    var sublabel = document.createElement("label");
    sublabel.innerHTML = "Subtotal:";
    var subspan = document.createElement("span");
    subspan.innerHTML = "$" + sessionStorage.subtotal;
    sublabel.appendChild(subspan);
    field.appendChild(sublabel);

    var taxlabel = document.createElement("label");
    taxlabel.innerHTML = "Tax:";
    var taxspan = document.createElement("span");
    taxspan.innerHTML = "$" + sessionStorage.tax;
    taxlabel.appendChild(taxspan);
    field.appendChild(taxlabel);

    var totlabel = document.createElement("label");
    totlabel.innerHTML = "Total:";
    var totspan = document.createElement("span");
    totspan.innerHTML = "$" + sessionStorage.total;
    totlabel.appendChild(totspan);
    field.appendChild(totlabel);

}