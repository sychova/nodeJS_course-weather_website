const request = require('request-promise-native')

const forecast = async ({ latitude, longitude }) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`
    const response = await request({ url, json: true })
    if (response.error) throw new Error ('No connection available.')
        return {
            description: response.current.weather_descriptions[0],
            temperature: response.current.temperature,
            feelslike: response.current.feelslike,
            icon: response.current.weather_icons[0],
            location: response.location.region
        }
}

module.exports = {
    forecast
}
