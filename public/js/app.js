const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherMessage = document.querySelector('#message')
const weatherIcon = document.querySelector('#weatherIcon')

weatherForm.addEventListener('submit', (event) => {
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