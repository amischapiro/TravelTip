import { storageService } from './storage.service.js';

export const locService = {
    getLocs,
    newPlace
}
const PLACES_KEY = 'placesDB'

const gLocs = storageService.load('placesDB') || [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

function newPlace(name, lat, lng) {
    const newPlace = {
        name: name,
        lat: lat,
        lng: lng,
        createdAt: Date.now()

    }

    gLocs.push(newPlace);
    storageService.save(PLACES_KEY, gLocs);
    
}


