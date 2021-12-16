const request = require('request-promise-native')

const geocode = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.GEOLOCATION_API_KEY}`
    const response = await request({ url, json: true })
    if (!response.features.length) throw new Error ('No match found')
    
    return {
        latitude: response.features[0].center[1],
        longitude: response.features[0].center[0]
    }
}

module.exports = {
    geocode
}
