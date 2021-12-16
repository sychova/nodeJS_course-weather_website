const getForecast = async (location) => {
    const response = location.coords
        ? await fetch(
              `/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}`
          )
        : await fetch(`/weather?address=${location}`)
    const data = await response.json()
    createForecastMarkup(data)
}

const createForecastMarkup = (data) => {
    if (data.error) return (weatherMessage.textContent = data.error)

    weatherIcon.style.display = 'block'
    weatherIcon.alt = `${data.description}`
    weatherIcon.src = `${data.icon}`
    weatherMessage.textContent = `You're in ${data.location}. The temperature is ${data.temperature}. And it feels like ${data.feelslike}.`
}
