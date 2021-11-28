const search = document.querySelector('input')
const weatherMessage = document.querySelector('#message')
const weatherIcon = document.querySelector('#weatherIcon')
const custLocWeather = document.querySelector('#custLoc')
const currLocWeather = document.querySelector('#currLoc')

custLocWeather.addEventListener('click', (event) => {
    event.preventDefault()
    const location = search.value
    weatherMessage.textContent = 'Loading'
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherMessage.textContent = data.error
            } else {
                weatherIcon.style.display = 'block'
                weatherIcon.alt = `${data.description}`
                weatherIcon.src = `${data.icon}`
                weatherMessage.textContent = `You're in ${data.location}. The temperature is ${data.temperature}. And it feels like ${data.feelslike}.`
            }
        })
    })
})

currLocWeather.addEventListener('click', (event) => {
    event.preventDefault()
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        fetch(`/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    weatherMessage.textContent = data.error
                } else {
                    weatherIcon.style.display = 'block'
                    weatherIcon.alt = `${data.description}`
                    weatherIcon.src = `${data.icon}`
                    weatherMessage.textContent = `You are in ${data.location}. The temperature is ${data.temperature}. And it feels like ${data.feelslike}.`
                }
            })
        })
    })
})