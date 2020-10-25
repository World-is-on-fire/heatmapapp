window.onload = init();

function init(){
    var data = [
        {"longitude": 5.63, "latitude": -3.23, "temp": "1"},
        {"longitude": 8.84, "latitude": 38.11, "temp": "2"}
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
        "8": "b2182b",
        "9": "#2166ac"
    }

    L_NO_TOUCH = false;
    L_DISABLE_3D = false;

    var mapPast = L.map(
        "mapPast",
        {
            center: [31.771421, -40.485469]
        }
    );

    var mapPresent = L.map(
        "mapPresent",
        {
            center: [31.771421, -40.485469]
        }
    );

    for (const point of data){
        L.circleMarker(
                [point["longitude"], point["latitude"]],
                {"bubblingMouseEvents": true, "color": colorMap[point["temp"]], "dashArray": null, "dashOffset": null, "fill": true, "fillColor": "#f4a582", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "opacity": 1.0, "radius": 3, "stroke": true, "weight": 3}
          ).addTo(mapPast);
    }

    for (const point of data){
        L.circleMarker(
                [point["longitude"], point["latitude"]],
                {"bubblingMouseEvents": true, "color": colorMap[point["temp"]], "dashArray": null, "dashOffset": null, "fill": true, "fillColor": "#f4a582", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "opacity": 1.0, "radius": 3, "stroke": true, "weight": 3}
          ).addTo(mapPresent);
    }
}
//var circle_marker_19ead25987eb4f87b149203f758badd8 = L.circleMarker(
    //                 [5.63, -3.23],
    //                 {"bubblingMouseEvents": true, "color": "#f4a582", "dashArray": null, "dashOffset": null, "fill": true, "fillColor": "#f4a582", "fillOpacity": 0.2, "fillRule": "evenodd", "lineCap": "round", "lineJoin": "round", "opacity": 1.0, "radius": 3, "stroke": true, "weight": 3}
    //             ).addTo(map_ae20d233dbb4489e9ffd45e1e9a00b94);