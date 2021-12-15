const forecastCreator = (data) => {
	// const weatherMessage = document.querySelector('#message')
	// const weatherIcon = document.querySelector('#weatherIcon')
	weatherIcon.style.display = 'block'
    weatherIcon.alt = `${data.description}`
    weatherIcon.src = `${data.icon}`
    weatherMessage.textContent = `You're in ${data.location}. The temperature is ${data.temperature}. And it feels like ${data.feelslike}.`
}