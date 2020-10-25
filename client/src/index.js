window.onload = init()

function init(){
    var map_ae20d233dbb4489e9ffd45e1e9a00b94 = L.map(
        "map_ae20d233dbb4489e9ffd45e1e9a00b94",
        {
            center: [31.771421, -40.485469],
            crs: L.CRS.EPSG3857,
            zoom: 2,
            zoomControl: true,
            preferCanvas: true,
        }
    );

    
    var data= {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [125.6, 10.1]
                },
                "style": {
                   "color": "#ff7800"
                },
                "properties": {
                    "temperature": "Hot"
                }
            }

    L.geoJSON(data).addTo(map_ae20d233dbb4489e9ffd45e1e9a00b94);
}