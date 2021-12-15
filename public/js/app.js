const search = document.querySelector('input')
const weatherMessage = document.querySelector('#message')
const weatherIcon = document.querySelector('#weatherIcon')
const custLocWeather = document.querySelector('#custLoc')
const currLocWeather = document.querySelector('#currLoc')

custLocWeather.addEventListener('click', async (event) => {
    event.preventDefault()
    const location = search.value
    weatherMessage.textContent = 'Loading'
    const response = await fetch(`/weather?address=${location}`)
    const data = await response.json()
    if (data.error) return weatherMessage.textContent = data.error
    forecastCreator(data)
})

currLocWeather.addEventListener('click', async (event) => {
    event.preventDefault()
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    const coordinates = await getCurrentPosition();
    const response = await fetch(`/weather?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}`)
    const data = await response.json()
    if (data.error) return weatherMessage.textContent = data.error
    forecastCreator(data)
})
