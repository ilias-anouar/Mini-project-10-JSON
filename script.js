let table = document.getElementById("tbody");
// creat Table
let id = 0;
function creatrow(Json) {
  id++;
  let tr = document.createElement("tr");
  tr.setAttribute("id", "tr" + id);
  tr.innerHTML = `<td>${Json["Title"]}</td>
    <td>${Json["Director"]}</td>
    <td>${Json["Runtime"]}</td>
    <td>${Json["Year"]}</td>
    <td><img src="posters/${Json["Title"]}.jpg" alt="movie poster"></td>
    <td>${Json["festivals"]}</td>
    <td>${Json["Actors"]}</td>`;
  table.appendChild(tr);
}
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
