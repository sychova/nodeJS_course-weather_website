const forecastGetter = async (location) => {
	if (!location.coords) {
		const response = await fetch(`/weather?address=${location}`)
		const data = await response.json()
		forecastMarkupCreator(data)
	} else {
		const response = await fetch(`/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
		const data = await response.json()
		forecastMarkupCreator(data)
	}
}

const forecastMarkupCreator = (data) => {
	if (data.error) return weatherMessage.textContent = data.error
	weatherIcon.style.display = 'block'
    weatherIcon.alt = `${data.description}`
    weatherIcon.src = `${data.icon}`
    weatherMessage.textContent = `You're in ${data.location}. The temperature is ${data.temperature}. And it feels like ${data.feelslike}.`
}