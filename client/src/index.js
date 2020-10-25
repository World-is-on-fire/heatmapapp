window.onload = init();

document.getElementById("startSearch").addEventListener("click", fetchTempDataForStartDate);

document.getElementById("endSearch").addEventListener("click", fetchTempDataForEndDate);

function fetchTempDataForStartDate(){
    //fetch date
    const date = document.getElementById("startDate").value;

    fetch(`/temp/${date}`)
    .then(response => response.json())
    .then(data => console.log(data.data));
}

function fetchTempDataForEndDate(){
    //fetch date
    const date = document.getElementById("endDate").value;

    fetch(`/temp/${date}`)
    .then(response => response.json())
    .then(data => console.log(data.data));
}


function init(){
    var mapPast = L.map(
        "mapPast",
        {
            center: [31.771421, -40.485469],
            crs: L.CRS.EPSG3857,
            zoom: 2,
            zoomControl: true,
            preferCanvas: true,
        }
    );

    var mapPresent = L.map(
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

    
    var data = [
        {"longitude": 5.63, "latitude": -3.23, "temp": "8"},
        {"longitude": 8.84, "latitude": 38.11, "temp": "9"}
    ];

    //(data + 40)/10 + 1

    //1: coldest, 6: hottest
    var colorMap = {
        "1": "#f7f7f7",
        "2": "#d1e5f0",
        "3": "#92c5de",
        "4": "#4393c3",
        "5": "#fddbc7",
        "6": "#f4a582",
        "7": "#d6604d",
        "8": "#b2182b",
        "9": "#2166ac"
    }

    for (const point of data){
        L.circleMarker(
                [point["longitude"], point["latitude"]],
                {"bubblingMouseEvents": true, "color": colorMap[point["temp"]], "dashArray": null, "dashOffset": null, "fill": true, "fillColor": colorMap[point["temp"]], "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "opacity": 1.0, "radius": 4, "stroke": true, "weight": 4}
          ).addTo(mapPast);
    }

    for (const point of data){
        L.circleMarker(
                [point["longitude"], point["latitude"]],
                {"bubblingMouseEvents": true, "color": colorMap[point["temp"]], "dashArray": null, "dashOffset": null, "fill": true, "fillColor": colorMap[point["temp"]], "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "opacity": 1.0, "radius": 4, "stroke": true, "weight": 4}
          ).addTo(mapPresent);
    }
}