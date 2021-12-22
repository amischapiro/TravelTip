import { storageService } from './storage.service.js';
import {utils} from './utils.service.js'
import { controller } from '../app.controller.js';

export const locService = {
    getLocs,
    newPlace,
    deleteLoc
}
const PLACES_KEY = 'placesDB'

const gLocs = storageService.load('placesDB') || [
    { id:utils.getId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384,createdAt: Date.now() }, 
    { id:utils.getId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581,createdAt: Date.now() }
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
        id: utils.getId(),
        name: name,
        lat: lat,
        lng: lng,
        createdAt: Date.now()

    }
    
    gLocs.push(newPlace);
    storageService.save(PLACES_KEY, gLocs);
    controller.onGetLocs()
    
}

function deleteLoc(id){
    const locIdx = gLocs.findIndex(loc=>{
        loc.id === id
    })
    gLocs.splice(locIdx,1)
    storageService.save(PLACES_KEY,gLocs)
}
