const forecastMarkupCreator = (data) => {
	if (data.error) return weatherMessage.textContent = data.error
	weatherIcon.style.display = 'block'
    weatherIcon.alt = `${data.description}`
    weatherIcon.src = `${data.icon}`
    weatherMessage.textContent = `You're in ${data.location}. The temperature is ${data.temperature}. And it feels like ${data.feelslike}.`
}