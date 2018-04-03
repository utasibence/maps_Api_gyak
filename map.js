const text_input = document.getElementById('text_input');
const game_button = document.getElementById('game_button');
let latitude = 0;
let longitude = 0;
let tip_latitude = 0;
let tip_longitude = 0;

function print(message) {
  var outputDiv = document.getElementById('output')
  outputDiv.innerHTML = message;
}

function initMap() {
  // Map options
  var options = {
    zoom: 7,
    center: {
      lat: 47.1625,
      lng: 19.5033
    },
    disableDefaultUI: true,
    styles: [{
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#444"
        }]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
          },
          {
            "weight": "1"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
          },
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "visibility": "simplified"
        }]
      },
      {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [{
          "visibility": "on"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
            "saturation": -100
          },
          {
            "lightness": 45
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "color": "#0072C0"
          },
          {
            "visibility": "on"
          }
        ]
      }
    ]
  }

  // New map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function(event) {
    // Add marker
    addMarker({
      coords: event.latLng
    });
    tip_latitude = event.latLng.lat(),
    tip_longitude = event.latLng.lng()
  });

  // Array of markers
  var markers = [
    {
      coords: {
        lat: 46.2530,
        lng: 40
      },
      content: 'Szeged'
    },
  ];

  // Loop through markers
  for (var i = 0; i < markers.length; i++) {
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      //icon:props.iconImage
    });

    var infoWindow = new google.maps.InfoWindow({
      content: props.content
    });

  }
}

function geocode(location) {
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: location,
        key: 'AIzaSyDw6L9S__qc86g35Czl9eNL-JhBK2UQkss'
      }
    })
    .then(function(response) {
      latitude = parseFloat(response.data.results[0].geometry.location.lat);
      longitude = parseFloat(response.data.results[0].geometry.location.lng);
      console.log(latitude, longitude);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function results() {
  let result = "";
  result += "<h1>" + text_input.value + "</h1>"
  result += "<p>" + latitude + "<br>" + longitude + "</p>"
  result += "<h1>Tipped:</h1>"
  result += "<p>" + tip_latitude + "<br>" + tip_longitude + "</p>"
  print(result);
}

function go() {
  geocode(text_input.value);
  setTimeout(function() {
    results();
  }, 500);
}

game_button.addEventListener('click', () =>
  go()
);
