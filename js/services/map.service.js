import { locService } from "./loc.service.js";

export const mapService = {
    initMap,
    addMarker,
    panTo,
    geocode
}

let gMap;
let gGeocoder;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            clickedLocation();
            gGeocoder = new google.maps.Geocoder();
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBdfQp3owBv9_H9Y-sFmgE7ssIs5tIR3oU';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function clickedLocation() {
    gMap.addListener("click", (mapsMouseEvent) => {
        const lat = JSON.stringify(mapsMouseEvent.latLng.toJSON().lat);
        const lng = JSON.stringify(mapsMouseEvent.latLng.toJSON().lng);
        const name = prompt('Name of new location?');
        locService.newPlace(name, lat, lng);
    });
}

function clear() {
    marker.setMap(null);
    responseDiv.style.display = "none";
}

function geocode(request) {
    // clear();
    gGeocoder
        .geocode(request)
        .then(result => {
            const { results } = result;

            gMap.setCenter(results[0].geometry.location);
            // marker.setPosition(results[0].geometry.location);
            // marker.setMap(gMap);
            // responseDiv.style.display = "block";
            // response.innerText = JSON.stringify(result, null, 2);
            return results;
        })
        .catch(err => {
            alert("Geocode was not successful for the following reason: " + err);
        });
}