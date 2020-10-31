window.onload = init();

document.getElementById("startSearch").addEventListener("click", fetchTempDataForStartDate);

document.getElementById("endSearch").addEventListener("click", fetchTempDataForEndDate);

let mapPast, mapPresent;

function fetchTempDataForStartDate(){
    //fetch date
    const date = document.getElementById("startDate").value;

    fetch(`/temp/${date}`)
    .then(response => response.json())
    .then(data => updateMap(mapPast, data.data));
}

function fetchTempDataForEndDate(){
    //fetch date
    const date = document.getElementById("endDate").value;

    fetch(`/temp/${date}`)
    .then(response => response.json())
    .then(data => updateMap(mapPresent, data.data));
}


function init(){
    mapPast = L.map(
        "mapPast",
        {
            center: [31.771421, -40.485469],
            crs: L.CRS.EPSG3857,
            zoom: 2,
            zoomControl: true,
            preferCanvas: true,
        }
    );

    mapPresent = L.map(
        "mapPresent",
        {
            center: [31.771421, -40.485469],
            crs: L.CRS.EPSG3857,
            zoom: 2,
            zoomControl: true,
            preferCanvas: true,
        }
    );

    var tile_layer_fd4cc6e7267547cea5582202737ef34c = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
    ).addTo(mapPast);

    var tile_layer_fd4cc6e7267547cea5582202737ef34c = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
    ).addTo(mapPresent);

    fetch(`/temp/1900`)
    .then(response => response.json())
    .then(data => updateMap(mapPast, data.data));

    fetch(`/temp/2006`)
    .then(response => response.json())
    .then(data => updateMap(mapPresent, data.data));
}

function updateMap(map, data){

    var cleanedData = dataConversion(data);

    //1: coldest, 6: hottest
    var colorMap = {
        "1": "#fbf460",
        "2": "#f6e412",
        "3": "#f8a26a",
        "4": "#f49132",
        "5": "#f48d49",
        "6": "#f47b2b",
        "7": "#f36e51",
        "8": "#ff0000"
    }

    for (const point of cleanedData){
        L.circleMarker(
                [point["Longitude"], point["Latitude"]],
                {"bubblingMouseEvents": true, "color": colorMap[point["temperature"]], "dashArray": null, "dashOffset": null, "fill": true, "fillColor": colorMap[point["temperature"]], "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "opacity": 1.0, "radius": 4, "stroke": true, "weight": 4}
          ).addTo(map);
    }
}

function dataConversion(data){
    let cleanedData = [];
    for (const line of data){
        const temperature = line["temperature"];
        if (temperature<=10){
            continue;
        }
        let convertedTemp = parseInt(temperature-24);
        if (convertedTemp < 1) {
            convertedTemp = 1;
        } else if (convertedTemp > 8){
            convertedTemp = 8;
        }
        line["temperature"] = convertedTemp;
        cleanedData.push(line);
    }
    return cleanedData;
}