
function showSection(sectionId) {
    document.getElementById("first").style.display = (sectionId === "first") ? "block" : "none";
    document.getElementById("second").style.display = (sectionId === "second") ? "block" : "none";
}

function removeBookmark(button) {
    button.parentElement.remove();
}


function query(){
    let url = "https://maps2.bristol.gov.uk/server2/rest/services/ext/ll_community_and_safety/MapServer/18/query?where=1%3D1&outFields=LOCATION_NAME,FULL_ADDRESS,SERVICE_NAME,TELEPHONE,EMAIL&outSR=4326&f=json"
    fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
    })
    .then (response => response.json())
    .then(outputTable);
}

function filter (e) {
    document.getElementsByClassName("w3-bar-item");
    for (i in items) {

    }
    e.classList.add("w3-grey");
    let encoded = encodeURIComponent(value);
    let url = 
    fetch(url,{ method: "GET", headers: { Accept: "application/json"} })
    .then(res=>res.json())
    .then(outputTable);
}

function outputTable(json){
    var results = document.getElementById("results");
    results.innerHTML = "";
    var f = json.features;
    for (var i = 0; i < f.length; i++) {
        var tr = document.createElement("tr");
        tr.setAttribute("id", "citzen")
        results.appendChild(tr);
        var td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = json.feautures[i].attributes.LOCATION_NAME ;
        var td1 = document.createElement("td1");
        tr.appendChild(td1);
        td.innerHTML = json.feautures[i].attributes.FULL_ADDRESS ;
        var td2 = document.createElement("td2");
        tr.appendChild(td2);
        td.innerHTML = json.feautures[i].attributes.SERVICE_NAME ;
        var td3 = document.createElement("td3");
        tr.appendChild(td3);
        td.innerHTML = json.feautures[i].attributes.TELEPHONE ;
        var td4 = document.createElement("td4");
        tr.appendChild(td4);
        td.innerHTML = json.feautures[i].attributes.EMAIL ;
    }
}
