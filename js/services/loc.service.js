import { storageService } from './storage.service';

export const locService = {
    getLocs
}

const locs = storageService.load('Saved places') || [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 29.557495050690875, lng: 34.95405618516751 },
//         zoom: 12,
//     });
//     currLocation();
//     clickedLocation();
//     renderSavedSpots();
// }

// function newPlace(name, lat, lng) {
//     const newPlace = {
//         id: getId(),
//         lat: lat,
//         lng: lng,
//         name: name
//     }

//     gSavedSpots.push(JSON.stringify(newPlace));
//     saveToStorage('Saved places', gSavedSpots);
//     renderSavedSpots();
// }


// function getPlaces() {
//     const spots = loadFromStorage('Saved places').map(spot => {
//         return JSON.parse(spot);
//     });
//     return spots;
// }
