/**
 * To load JSON data :
 * use the XMLHttpRequest API (XHR).
 * Open method to open a new request : .open(method, URL).
 * using "GET" method since we just want to retrieve some data.
 * Specify the response type to "JSON".
 * Send the request with ".Send()" method.
 */
// JSON file path
let getpath = `/movies.json`;
// create a query 
let get = new XMLHttpRequest();
get.open("GET", getpath);
get.responseType = "json";
get.send();
get.onload = function () {
  let movies = get.response; // Store response in variable
  for (let i = 0; i < movies.length; i++) { // Loop through variable
    creatrow(movies[i]); // Call function to create row for for each element in response
  }
};

/**
 * For saving JSON file response and make it readable :
 * creating of HTML elements to display the response
*/

let table = document.getElementById("tbody");
// :::::::creating Rows::::::::
let id = 0;
function creatrow(Json) {
  id++;
  let tr = document.createElement("tr");
  tr.setAttribute("id", "tr" + id);
  tr.innerHTML = `<td>${Json["Title"]}</td>
    <td>${Json["Director"]}</td>
    <td>${parseInt(Json["Runtime"])}</td>
    <td>${Json["Year"]}</td>
    <td><img src="posters/${Json["Title"]}.jpg" alt="movie poster"></td>`;
  tr.appendChild(creatlist(Json)); // For the complex elements : calling another function to save them
  tr.appendChild(actors(Json));
  table.appendChild(tr);
}

/**
 * Function for the complex elements :
 * To create list of festivals and actors.
 * The return is a HTML table cell element.
 */

// ::::::::creating festivale list:::::::::
function creatlist(jsonObj) {
  let festivals, ul, li, td;
  festivals = jsonObj["festivals"];
  td = document.createElement("td");
  ul = document.createElement("ul");
  for (let j = 0; j < festivals.length; j++) {
    li = document.createElement("li");
    li.setAttribute("id", "li" + j);
    li.innerHTML = festivals[j];
    ul.appendChild(li);
  }
  td.appendChild(ul);
  return td;
}

// ::::::::creating actors list::::::::::
function actors(jsonObj) {
  let actors, ul, li, td;
  td = document.createElement("td");
  ul = document.createElement("ul");
  actors = jsonObj["Actors"];
  for (let j = 0; j < actors.length; j++) {
    li = document.createElement("li");
    li.setAttribute("id", "li" + j);
    li.innerHTML = `${actors[j]["first-name"]} ${actors[j]["last-name"]},nationality:${actors[j]["nationality"]}`;
    ul.appendChild(li);
  }
  td.appendChild(ul);
  return td;
}
/**
 * Sort functions :
 * To sort "str" and "int" => two deferent function in ASC & DESC way :
 * Function for "ACS".
 * Function for "DESC".
 * (for both types "str" & "int").
 * Add ("n") as param to Specify the index of colomn to sort.
 */
// ::::::::::::sort desc:::::::::::::
function sortTablelow(n) {
  let table, rows, switching, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// ::::::::::sort asc:::::::::::::
function sortTableup(n) {
  let table, rows, switching, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// sort Number desc
function sortTableNumberDesc(n) {
  let table, rows, switching, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (Number(x.innerHTML) < Number(y.innerHTML)) {  // add Number to the function to specify the sort
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// sort Numbers asc
function sortTableNumberAsc(n) {
  let table, rows, switching, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (Number(x.innerHTML) > Number(y.innerHTML)) { // add Number to the function to specify the sort
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// head of the table variables
let title, duration, Year, derector;
title = document.getElementById("title");
duration = document.getElementById("duration");
derector = document.getElementById("director");
Year = document.getElementById("year");

// click event

// ::::::::::title sort:::::::::::::::
title.addEventListener("click", function () {
  span = document.getElementById("statuT");
  if (span.innerHTML == '<i class="bi bi-caret-up"></i>') {
    sortTablelow(0);
    span.innerHTML = `<i class="bi bi-caret-down"></i>`;
  } else if (span.innerHTML == '<i class="bi bi-caret-down"></i>') {
    sortTableup(0);
    span.innerHTML = `<i class="bi bi-caret-up"></i>`;
  }
});

// ::::::::::::duration sort::::::::
duration.addEventListener("click", function () {
  span = document.getElementById("statuD");
  if (span.innerHTML == '<i class="bi bi-caret-up"></i>') {
    sortTableNumberAsc(2);
    span.innerHTML = `<i class="bi bi-caret-down"></i>`;
  } else if (span.innerHTML == '<i class="bi bi-caret-down"></i>') {
    sortTableNumberDesc(2);
    span.innerHTML = `<i class="bi bi-caret-up"></i>`;
  }
});

// :::::::::::::Year sort::::::::::
Year.addEventListener("click", function () {
  span = document.getElementById("statuY");
  if (span.innerHTML == '<i class="bi bi-caret-up"></i>') {
    sortTableNumberAsc(3);
    span.innerHTML = `<i class="bi bi-caret-down"></i>`;
  } else if (span.innerHTML == '<i class="bi bi-caret-down"></i>') {
    sortTableNumberDesc(3);
    span.innerHTML = `<i class="bi bi-caret-up"></i>`;
  }
});

// :::::::::::::derector sort:::::::
derector.addEventListener("click", function () {
  span = document.getElementById("statuDr");
  if (span.innerHTML == '<i class="bi bi-caret-up"></i>') {
    sortTablelow(1);
    span.innerHTML = `<i class="bi bi-caret-down"></i>`;
  } else if (span.innerHTML == '<i class="bi bi-caret-down"></i>') {
    sortTableup(1);
    span.innerHTML = `<i class="bi bi-caret-up"></i>`;
  }
});

/**
 * Searsh in table and filtration : 
 * Add "KEYUP" event to input => with a function :
 * To check data and filte the table.
 */

// :::::keyup event:::::
inputsearch = document.getElementById("input");
inputsearch.addEventListener("keyup", function () {
  let filter, table, row, data, dataValue; // Variables that will be used.
  filter = inputsearch.value.toUpperCase(); // Store input value in a variable => "ToUpperCase".
  table = document.getElementById("table");
  row = table.getElementsByTagName("tr"); // All table row elements
  for (i = 0; i < row.length; i++) { // Loop through all rows
    data = row[i].getElementsByTagName("td")[0]; // Get the first table cell element 
    if (data) {
      dataValue = data.innerText; 
      if (dataValue.toUpperCase().indexOf(filter) > -1) {  // Check if TD innerText index of input value => if false : -1 ; if True : 1 || 0
        row[i].style.display = ""; // Keep the Row That return : True
      } else {
        row[i].style.display = "none"; // hide The Row That return : False
      }
    }
  }
});