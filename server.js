const express= require('express')
const mongoose= require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const path= require('path')
const dotenv = require('dotenv')
const server= express()

const connectDB = require('./config/db')


// Load config
dotenv.config({ path: './config/config.env' })

connectDB()
const PORT=process.env.PORT || 3000


// Handlebars Helperssss
const {
    formatDate,
    stripTags,
  } = require('./helpers/hbs')
// Handlebars
server.engine(
    '.hbs',
    exphbs({
      helpers: {
        formatDate,
        stripTags,
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
server.set('view engine', '.hbs')
// Body parser
server.use(express.urlencoded({ extended: false }))
server.use(express.json())
// Method override
server.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)
// Static folder
server.use(express.static(path.join(__dirname, 'public')))

// Routes
server.use('/', require('./routes/index'))
server.use('/documents', require('./routes/documents'))
  
server.listen(PORT,() =>{
    console.log('server started..')
})