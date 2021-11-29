const request = require('request-promise-native')

const geocode = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFzaWsiLCJhIjoiY2t2MHpsajFrMWV1cjJ1cXd0d3AwaHc5NiJ9.n6ijCTU5dTlCBmQJZzW33g`
    const response = await request({ url, json: true })
    if (response.features.length === 0) {
        throw new Error ('No match found')
    } else {
        return {
            latitude: response.features[0].center[1],
            longitude: response.features[0].center[0]
        }
    }
}

module.exports = {
    geocode
}
