import { storageService } from './storage.service.js';

export const locService = {
    getLocs,
    newPlace
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

function newPlace(name, lat, lng) {
    const newPlace = {
        name: name,
        lat: lat,
        lng: lng
    }

    locs.push(newPlace);
    storageService.save(locs);
}


