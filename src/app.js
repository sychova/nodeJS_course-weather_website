const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anastasiya Sychova'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Anastasiya Sychova'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpMessage: 'This is a help page.',
        name: 'Anastasiya Sychova'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address && !req.query.lat && !req.query.lon) {
        return res.send({
            error: 'No location provided!'
        })
    }

    if (req.query.address) {
        geocode.geocode(req.query.address, (error, { latitude, longitude } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast.forecast(latitude, longitude, (error, { description, temperature, feelslike, icon, location }) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    description,
                    temperature,
                    feelslike,
                    icon,
                    location
                })
            })
        })
    } else {
        forecast.forecast(req.query.lat, req.query.lon, (error, { description, temperature, feelslike, icon, location }) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                description,
                temperature,
                feelslike,
                icon,
                location
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search property provided'
        })
    }
    res.send({
        location: 'Minsk',
        temperature: 2
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error page',
        errorMessage: 'Help article not found',
        name: 'Anastasiya Sychova'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error page',
        errorMessage: 'Page not found',
        name: 'Anastasiya Sychova'
    })
})

app.listen(port, () => {
    console.log(`App ready on port ${port}!`)
})