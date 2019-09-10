const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 80

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/blogs', (req, res) => {
    res.render('blogs')
})

app.get('/blogs/:id', (req, res) => {
    res.render('blogpost')
})

app.get('/services', (req, res) => {
    res.render('services')
})

app.get('/services/:id', (req, res) => {
    res.render('serviceitem')
})

app.get('/pricing', (req, res) => {
    res.render('pricing')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/faq', (req, res) => {
    res.render('FAQ')
})

app.get('/questionnaire-home', (req, res) => {
    res.render('questionnaire-home')
})

app.get('/questionnaire-1', (req, res) => { //Temp for demo purposes
    res.render('questionnaire-1')
})

app.get('/questionnaire-2', (req, res) => { //Temp for demo purposes
    res.render('questionnaire-2')
})

app.get('/questionnaire-3', (req, res) => { //Temp for demo purposes
    res.render('questionnaire-3')
})

app.get('/questionnaire-4', (req, res) => { //Temp for demo purposes
    res.render('questionnaire-4')
})

app.get('/questionnaire-doc', (req, res) => { //Temp for demo purposes
    res.render('questionnaire-doc')
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(port, () => { 
    console.log('Server is up on port 80.')
})