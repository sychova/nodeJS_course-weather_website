const request = require('request-promise-native')

const temp = {
    "request": {
        "type": "City",
        "query": "New York, United States of America",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "New York",
        "country": "United States of America",
        "region": "New York",
        "lat": "40.714",
        "lon": "-74.006",
        "timezone_id": "America/New_York",
        "localtime": "2019-09-07 08:14",
        "localtime_epoch": 1567844040,
        "utc_offset": "-4.0"
    },
    "current": {
        "observation_time": "12:14 PM",
        "temperature": 13,
        "weather_code": 113,
        "weather_icons": [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
        ],
        "weather_descriptions": [
            "Sunny"
        ],
        "wind_speed": 0,
        "wind_degree": 349,
        "wind_dir": "N",
        "pressure": 1010,
        "precip": 0,
        "humidity": 90,
        "cloudcover": 0,
        "feelslike": 13,
        "uv_index": 4,
        "visibility": 16
    }
}

const forecast = async ({ latitude, longitude }) => {
    const url = `http://api.weatherstack.com/current?access_key=4b2554510856f2dcc9ef34f90a838eb9&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`
    const response = await request({ url, json: true })
    console.log(latitude)
    console.log(longitude)
    if (response.error) {
        console.log(response.error)
        throw new Error ('No connection available.')
    } else {
        return {
            description: response.current.weather_descriptions[0],
            temperature: response.current.temperature,
            feelslike: response.current.feelslike,
            icon: response.current.weather_icons[0],
            location: response.location.region
        }
    }
}

module.exports = {
    forecast
}
