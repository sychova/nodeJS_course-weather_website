const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4b2554510856f2dcc9ef34f90a838eb9&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}&units=m`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('No connection available.', undefined)
        } else if (body.error) {
            callback('No match found.', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                icon: body.current.weather_icons[0],
                location: body.location.region
            })
        }
    })
}

const forecastErrCheck = (error, { description, temperature, feelslike, icon, location }) => {
    return new Promise((resolve, reject) => {
        if (error) {
            reject(error)
        }
        resolve({
            description,
            temperature,
            feelslike,
            icon,
            location
        })
    })
}

module.exports = {
    forecast,
    forecastErrCheck
}