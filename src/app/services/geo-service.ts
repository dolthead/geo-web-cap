import { Geolocation } from '@capacitor/geolocation';

export {
    getPositionFromBrowser,
    getPositionFromCapacitor,
}

const GEO_OPTIONS = { enableHighAccuracy: true, maximumAge: 0 };

function getPositionFromBrowser(callback: Function): any {
    navigator.geolocation.getCurrentPosition(
        position => callback(cleanupPosition(position)),
        error => console.log(error),
        GEO_OPTIONS);
}

async function getPositionFromCapacitor() {
  return cleanupPosition(await Geolocation.getCurrentPosition(GEO_OPTIONS));
}

function cleanupPosition(position: any) {
    return { 
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp 
    };
}
