var bomdata = require('./bomdata.json');
var convertAddressToLatitudeLongitude = require('./convertAddressToLatitudeLongitude');

function buildLocationObject(location, siteNumber, state, callback) {
    data = {};
    var locationString = location + " " + state + ", Australia";
    var RunGeoLocate = false;
    var locationIsSet = bomdata[state] && bomdata[state][location];
    if (locationIsSet && typeof bomdata[state][location].lat === 'string') {
        RunGeoLocate = true;
    } else if (!locationIsSet) {
        RunGeoLocate = true;
    }
    if (RunGeoLocate === true) { // if the latitude is not set in the file, try again to find it

        convertAddressToLatitudeLongitude(locationString, function(error, lat, lng) {
            if (error) {
                console.log("error:", error);
                return;
            }
            data = {
                siteNumber: siteNumber,
                lat: lat,
                lng: lng
            };
            callback(null, data);
        });

    } else { // else read the value from
        data = {
            siteNumber: siteNumber,
            lat: bomdata[state][location].lat,
            lng: bomdata[state][location].lng
        };
        callback(null, data);
    }
}

module.exports = buildLocationObject;
