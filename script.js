// load JSON file url
let getpath = `/movies.json`;
// create a query
let get = new XMLHttpRequest();
get.open("GET", getpath);
get.responseType = "json";
get.send();
get.onload = function () {
  let movies = get.response;
  for (let i = 0; i < movies.length; i++) {
    creatrow(movies[i]);
  }
};
let table = document.getElementById("tbody");
// creating Rows
let id = 0;
function creatrow(Json) {
  id++;
  let tr = document.createElement("tr");
  tr.setAttribute("id", "tr" + id);
  tr.innerHTML = `<td>${Json["Title"]}</td>
    <td>${Json["Director"]}</td>
    <td>${parseInt(Json["Runtime"])} min</td>
    <td>${parseInt(Json["Year"])}</td>
    <td><img src="posters/${Json["Title"]}.jpg" alt="movie poster"></td>`;
  creatlist(Json);
  tr.appendChild(creatlist(Json));
  tr.appendChild(actors(Json));
  table.appendChild(tr);
}
// creating festivale list
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
// creating actors list
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
// sort desc
function sortTablelow(n) {
  let table, rows, switching, x, y, shouldSwitch, cont;
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
      cont++;
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
// sort asc
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
// head of the table
let title, duration, Year;
title = document.getElementById("title");
duration = document.getElementById("duration");
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
    sortTablelow(2);
    span.innerHTML = `<i class="bi bi-caret-down"></i>`;
  } else if (span.innerHTML == '<i class="bi bi-caret-down"></i>') {
    sortTableup(2);
    span.innerHTML = `<i class="bi bi-caret-up"></i>`;
  }
});
// :::::::::::::Year sort::::::::::
Year.addEventListener("click", function () {
  span = document.getElementById("statuY");
  if (span.innerHTML == '<i class="bi bi-caret-up"></i>') {
    sortTablelow(3);
    span.innerHTML = `<i class="bi bi-caret-down"></i>`;
  } else if (span.innerHTML == '<i class="bi bi-caret-down"></i>') {
    sortTableup(3);
    span.innerHTML = `<i class="bi bi-caret-up"></i>`;
  }
});
// searsh in table and filtration
// :::::keyup event:::::
inputsearch = document.getElementById("input");
inputsearch.addEventListener("keyup", function () {
  let filter, table, row, data, dataValue;
  input = document.getElementById("input");
  filter = inputsearch.value.toUpperCase();
  table = document.getElementById("table");
  row = table.getElementsByTagName("tr");
  for (i = 0; i < row.length; i++) {
    data = row[i].getElementsByTagName("td")[0];
    if (data) {
      dataValue = data.textContent || data.innerText;
      if (dataValue.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }
});
