const path = require('path')
const express = require('express')
const hbs = require('hbs')

const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const { ExpressOIDC } = require('@okta/oidc-middleware')

const okta = require('./okta')
const indexRouter = require('./routes/index')
const dashboardRouter = require('./routes/dashboard')
const profileRouter = require('./routes/profile')
const registrationRouter = require('./routes/register')
const resetPassword = require('./routes/reset-password')


const app = express()
const port = process.env.PORT || 3000

const oidc = new ExpressOIDC({
    issuer: `${process.env.ORG_URL}/oauth2/default`,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
    scope: 'openid profile',
  })
  

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/views')
const partialsPath = path.join(__dirname, '/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
 
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false,
}))

app.use(oidc.router)
app.use(okta.middleware)

app.use('/', indexRouter)
app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter)
app.use('/profile', oidc.ensureAuthenticated(), profileRouter)
app.use('/register', registrationRouter)
app.use('/reset-password', resetPassword)
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

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


module.exports = { app, oidc }

// app.listen(port, () => { 
//     console.log('Server is up on port 80.')
// })