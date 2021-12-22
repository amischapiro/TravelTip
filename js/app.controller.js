import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onDelete = onDelete;
window.onFindAddress = onFindAddress;

const key = ''


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            let url = new URL('https://amischapiro.github.io/TravelTip/')
            // let params = new URLSearchParams(url.search)
            let searchParams = url.searchParams
            searchParams.set('home',2)
            url.search = searchParams.toString()
            // params.set('home',1)
            // params.toString()
            let new_url = url.toString()
            // console.log('params:', params.toString());
            console.log('new_url:', new_url);
            
        })
        .catch(() => console.log('Error: cannot init map'));

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            const strHTMLs = locs.map(loc=>{
                return`<tr><td>ID:${loc.id}</td><td>Name:${loc.name}</td><td>Lat: ${loc.lat}</td><td>Lng:${loc.lng}</td><td>Created at: ${loc.createdAt}</td>
                <td><button onclick="onPanTo(${loc.lat},${loc.lng})">Go</button><button onclick="onDelete('${loc.id}')">Delete</button>
                </tr>`
            })
            console.log('locs:', strHTMLs.join(''));
            
            document.querySelector('tbody').innerHTML = strHTMLs.join('')
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo(lat=35.6895,lng=139.6917) {
    console.log('Panning the Map');
    mapService.panTo(lat,lng);
}

function onDelete(id){
        locService.deleteLoc(id)
        onGetLocs()
}

function onFindAddress() {
    const elInput = document.querySelector('input');
    const address = elInput.value;
    elInput.value = '';
    mapService.geocode({address});
}