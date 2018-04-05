const bacs_kiskun = document.getElementById('bacs_kiskun');
const baranya = document.getElementById('baranya');
const bekes = document.getElementById('bekes');
const borsod_abauj_zemplen = document.getElementById('borsod_abauj_zemplen');
const fejer = document.getElementById('fejer');
const gyor_moson_sopron = document.getElementById('gyor_moson_sopron');
const hajdu_bihar = document.getElementById('hajdu_bihar');
const heves = document.getElementById('heves');
const jasz_nagykun_szolnok = document.getElementById('jasz_nagykun_szolnok');
const komarom_esztergom = document.getElementById('komarom_esztergom');
const nograd = document.getElementById('nograd');
const pest = document.getElementById('pest');
const somogy = document.getElementById('somogy');
const szabolcs_szatmar_bereg = document.getElementById('szabolcs_szatmar_bereg');
const tolna = document.getElementById('tolna');
const vas = document.getElementById('vas');
const veszprem = document.getElementById('veszprem');
const zala = document.getElementById('zala');
const csongrad = document.getElementById('csongrad');

const add_button = document.getElementById('add_button');
const remove_button = document.getElementById('remove_button');
const modify_button = document.getElementById('modify_button')
const text_input = document.getElementById('text_input');

let megye_city;
let longitude = 0;
let latitude = 0;

// Array of markers
let markers = [{
    coords: {
      lat: 46.2530,
      lng: 20.1414
    },
    content: csongrad_city[0]
  },
  {
    coords: {
      lat: 46.4181,
      lng: 20.3300
    },
    content: csongrad_city[1]
  },
  {
    coords: {
      lat: 46.654789,
      lng: 20.263749
    },
    content: csongrad_city[2]
  }
];


function print(message) {
  var outputDiv = document.getElementById('output')
  outputDiv.innerHTML = message;
}

function get_city(megye) {
  let result = "";
  for (let i = 0; i < megye.length; i++) {
    result += '<p>' + megye[i] + '</p>'
  }
  megye_city = megye;
  print(result);
}

// Wait for Server Response
function wait() {
  markers.push({
    coords: {
      lat: latitude,
      lng: longitude
    },
    content: text_input.value
  });
  console.log(markers);
  get_city(megye_city);
  initMap();
}

// Add City to the List
function add_city() {
  megye_city.push(text_input.value);
  geocode(text_input.value);
  setTimeout(function() {
    wait();
  }, 500);
}

// Remove City from the List
function remove_city() {
  let rm = megye_city.indexOf(text_input.value);
  megye_city[rm] = "";
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].content == text_input.value) {
      markers[i] = "";
    }
  }
  get_city(megye_city);
  initMap();
}

// Modify City on the List
function modify_city() {
  let new_item = megye_city.indexOf(text_input.value);
  let old_item = prompt("Melyik elemet szeretné módosítani?");
  megye_city[old_item] = new_item;
  for (let i = 0; i < markers.length; i++) {
    if (markers[i].content == old_item) {
      markers[i] = "";
    }
  }
  geocode(text_input.value);
  setTimeout(function() {
    wait();
  }, 300);
}

bacs_kiskun.addEventListener('click', () =>
  get_city(bacs_kiskun_city)
);

baranya.addEventListener('click', () =>
  get_city(baranya_city)
);

bekes.addEventListener('click', () =>
  get_city(bekes_city)
);

borsod_abauj_zemplen.addEventListener('click', () =>
  get_city(borsod_abauj_zemplen_city)
);

fejer.addEventListener('click', () =>
  get_city(fejer_city)
);

gyor_moson_sopron.addEventListener('click', () =>
  get_city(gyor_moson_sopron_city)
);

hajdu_bihar.addEventListener('click', () =>
  get_city(hajdu_bihar_city)
);

heves.addEventListener('click', () =>
  get_city(heves_city)
);

jasz_nagykun_szolnok.addEventListener('click', () =>
  get_city(jasz_nagykun_szolnok_city)
);

komarom_esztergom.addEventListener('click', () =>
  get_city(komarom_esztergom_city)
);

nograd.addEventListener('click', () =>
  get_city(nograd_city)
);

pest.addEventListener('click', () =>
  get_city(pest_city)
);

somogy.addEventListener('click', () =>
  get_city(somogy_city)
);

szabolcs_szatmar_bereg.addEventListener('click', () =>
  get_city(szabolcs_szatmar_bereg_city)
);

tolna.addEventListener('click', () =>
  get_city(tolna_city)
);

vas.addEventListener('click', () =>
  get_city(vas_city)
);

veszprem.addEventListener('click', () =>
  get_city(veszprem_city)
);

zala.addEventListener('click', () =>
  get_city(zala_city)
);

csongrad.addEventListener('click', () =>
  get_city(csongrad_city)
);

add_button.addEventListener('click', () =>
  add_city()
);

remove_button.addEventListener('click', () =>
  remove_city()
);

modify_button.addEventListener('click', () =>
  modify_city()
);







// Map

function initMap() {
  // Map options
  var options = {
    zoom: 6.5,
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
    });

    var infoWindow = new google.maps.InfoWindow({
      content: props.content
    });

    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }
}

// Address Requests to Create New Marker
geocode();

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
