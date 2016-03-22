

// Initialize map
mapboxgl.accessToken = 'pk.eyJ1Ijoibm1hcmdvbGlzODkiLCJhIjoiY2lnbXZlem9xMDAzdDZjbTM4a2tteXdzMSJ9.j6aj2wMzUUb8FZR1XMBiBg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [-98.613, 40],
    zoom: 3
});

// Define markers
var markers = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-77.072778, 38.907222]
        },
        "properties": {
            "title": "Georgetown University",
            "marker-symbol": "college",
            "description": "<div class=\"marker-title\">Studied Science, Technology and International Affairs</div><p>Took GIS, Remote Sensing, two computer science classes, including JavaScript and C++.</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-122.41914, 38.913188059745586]
        },
        "properties": {
            "title": "San Francisco City Hall",
            "marker-symbol": "town-hall",
            "description": "<div class=\"marker-title\">Urban Agriculture Intern</div><p>Mapped audit of city owned land available for urban agriculture.</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-77.040159, 38.904972]
        },
        "properties": {
            "title": "Robert Graham Center",
            "marker-symbol": "hospital",
            "description": "<div clas=\"marker-title\">Robert Graham Center</div><p>What I did</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-77.034226, 38.903353]
        },
        "properties": {
            "title": "Bank Information Center",
            "marker-symbol": "marker",
            "description": "<div clas=\"marker-title\">Bank Information Center</div><p>What I did</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-88.9, 17.9]
        },
        "properties": {
            "title": "Maya Agriculture and Water Systems Research",
            "marker-symbol": "wetland",
            "description": "<div clas=\"marker-title\">Research Assistant</div><p>What I did</p>"
        }
    }]
};


// Add markers to map

map.on('style.load', function () {
    // Add marker data as a new GeoJSON source.
    map.addSource("markers", {
        "type": "geojson",
        "data": markers
    });

    // Add a layer showing the markers.
    map.addLayer({
        "id": "markers",
        "interactive": true,
        "type": "symbol",
        "source": "markers",
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "icon-allow-overlap": true
        }
    });
});

// Create popups

var popup = new mapboxgl.Popup();

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
    map.featuresAt(e.point, {
        radius: 7.5, // Half the marker size (15px).
        includeGeometry: true,
        layer: 'markers'
    }, function (err, features) {

        if (err || !features.length) {
            popup.remove();
            return;
        }

        var feature = features[0];
        // console.log(feature);

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(feature.geometry.coordinates)
            .setHTML(feature.properties.description)
            .addTo(map);
    });
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    map.featuresAt(e.point, {
        radius: 7.5, // Half the marker size (15px).
        layer: 'markers'
    }, function (err, features) {
        map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
    });
});


function fly() {
    // Fly to the next point on the map
    map.flyTo({
        center: [-77.072778, 38.907222],
        zoom: 13.5,
        pitch: 20
    });

    var feature = markers.features[0];
    console.log(feature);


    popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.description)
        .addTo(map);

}

console.log(markers);

