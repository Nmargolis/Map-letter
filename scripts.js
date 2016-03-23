

// Initialize map
mapboxgl.accessToken = 'pk.eyJ1Ijoibm1hcmdvbGlzODkiLCJhIjoiY2lnbXZlem9xMDAzdDZjbTM4a2tteXdzMSJ9.j6aj2wMzUUb8FZR1XMBiBg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nmargolis89/cim3wwy0x00atcwm2i0dmga0z',
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
            "id": "georgetown",
            "marker-symbol": "college",
            "description": "<div class=\"marker-title\">Studied Science, Technology and International Affairs</div><p>Took GIS, Remote Sensing, two computer science classes, including JavaScript and C++.</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-122.41914, 37.77919]
        },
        "properties": {
            "title": "San Francisco City Hall",
            "id": "mayor",
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
            "id": "rgc",
            "marker-symbol": "hospital",
            "description": "<div class=\"marker-title\">Robert Graham Center</div><p>What I did</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-77.034226, 38.903353]
        },
        "properties": {
            "title": "Bank Information Center",
            "id": "bic",
            "marker-symbol": "library",
            "description": "<div class=\"marker-title\">Bank Information Center</div><p>What I did</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-88.8333, 17.8333]
        },
        "properties": {
            "title": "Maya Agriculture and Water Systems Research",
            "id": "belize",
            "marker-symbol": "campsite",
            "description": "<div class=\"marker-title\">Research Assistant</div><p>What I did</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-122.411462, 37.788666]
        },
        "properties": {
            "title": "Hackbright Academy",
            "id": "hackbright",
            "marker-symbol": "college",
            "description": "<div class=\"marker-title\">Fellow at Hackbright Academy</div><p>I recently graduated Hackbright Academy, an intensive 12 week software engineering program. While I learned a ton by figuring things out on the job, I decided to attend Hackbright Academy to learn full stack web development to understand how to build something from the ground up. Hackbright taught me the Python, SQL, JavaScript, HTML/CSS and concepts like object orientation, testing, and knowledge of data structures required to build a web app. But the most valuable experience I gained at Hackbright was learning how to learn, and that will allow me to continue to pick up new languages and technologies in the future.</p>"
        }
    }, {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-77.03238901390978, 38.913188059745586]
        },
        "properties": {
            "title": "Mapbox",
            "id": "mapbox",
            "marker-symbol": "rocket",
            "description": "<div class=\"marker-title\">Map Data Engineer at Mapbox</div><p>I would be a valuable addition to the Mapbox team. I would be a valuable addition to the Mapbox team. I would be a valuable addition to the Mapbox team. I would be a valuable addition to the Mapbox team.</p>"
        }
    }]
};


// Add markers to map
map.on('style.load', function () {
    // Add marker data as a new GeoJSON source.
    map.addSource("markers", {
        "type": "geojson",
        "data": markers,
    //     cluster: true,
    //     clusterMaxZoom: 14,
    //     clusterRadius: 50
    });

    // Add a layer showing the markers.
    map.addLayer({
        "id": "markers",
        "interactive": true,
        "type": "symbol",
        "source": "markers",
        "layout": {
            "icon-image": "{marker-symbol}-15",
            "icon-size": 2,
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
        openPopup(feature);

        // Scroll to the resume item in the sidebar
        var resumeItemId = '#' + feature.properties.id;
        console.log(resumeItemId);
        $.scrollTo($(resumeItemId), 800, {offset: function() {
            var topOffset = -0.20 * $(window).height();
            console.log(topOffset);
            return {top: topOffset};
            }});

        // To Do: Fix so this makes the right item active in the sidebar

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


// Define waypoints to trigger flying to resume items when they appear on screen
$('.resume-item').waypoint(function(direction) {
    // console.log(direction);
    if (direction == 'down') {
        // Set current element to active
        setActive(this.element);

        // Find marker associated with this resume item
        var markerMatch = findMatchingMarker(this.element.id);
        // console.log(markerMatch);
                
        // Fly to the matching marker
        fly(markerMatch);
    }}, {
            offset: '21%'
});

$('.resume-item').waypoint(function(direction) {
    // console.log(direction);
    if (direction == 'up') {
       // Set current element to active
       setActive(this.element);

        // Find marker associated with this resume item
        var markerMatch = findMatchingMarker(this.element.id);
        // console.log(markerMatch);
                
        // Fly to the matching marker
        fly(markerMatch);
    }}, {
            offset: '19%'
});

function openPopup(marker) {
    popup.setLngLat(marker.geometry.coordinates)
    .setHTML(marker.properties.description)
    .addTo(map);
}

function setActive(element) {
    // Remove active class from all resume items
    $('.resume-item').removeClass('active');

    // Add active class to current resume item
    $(element).addClass('active');
}

function findMatchingMarker(elementId) {
    for (var i = 0; i < markers.features.length; i++) {
        // console.log(markers.features[i]);
        if (markers.features[i].properties.id == elementId) {
            var markerMatch = markers.features[i];
            return markerMatch;
        }
    }
}

function fly(markerMatch) {
    // Fly to the matching marker
    map.flyTo({
        center: markerMatch.geometry.coordinates,
        zoom: 13.5,
        pitch: 20
    });

    // Open the associated popup
    openPopup(markerMatch);
}

// console.log(waypoint);
