const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFzaWsiLCJhIjoiY2t2MHpsajFrMWV1cjJ1cXd0d3AwaHc5NiJ9.n6ijCTU5dTlCBmQJZzW33g`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('No connection available.', undefined)
        } else if (body.features.length === 0) {
            callback('No match found.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports.geocode = geocode