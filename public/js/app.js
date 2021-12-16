const search = document.querySelector('input')
const weatherMessage = document.querySelector('#message')
const weatherIcon = document.querySelector('#weatherIcon')
const custLocWeather = document.querySelector('#custLoc')
const currLocWeather = document.querySelector('#currLoc')

custLocWeather.addEventListener('click', async (event) => {
    event.preventDefault()
    const location = search.value
    weatherMessage.textContent = 'Loading'
    getForecast(location)
})

currLocWeather.addEventListener('click', async (event) => {
    event.preventDefault()
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    const coordinates = await getCurrentPosition()
    weatherMessage.textContent = 'Loading'
    getForecast(coordinates)
})
