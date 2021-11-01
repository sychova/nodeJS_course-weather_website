const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherMessage = document.querySelector('#message')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    weatherMessage.textContent = 'Loading'
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherMessage.textContent = data.error
            } else {
                weatherMessage.textContent = `You're in ${data.location}. ${data.forecast}`
            }
        })
    })
})