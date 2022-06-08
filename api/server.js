require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { notFound, productionErrors, logger } = require('./handlers')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected successfully to mongodb server'))
  .catch((err) => {
    console.error(`mongoose error → ${err.message}`)
    process.exit(1)
  })

const app = express()
app.use(express.json())
app.use(express.raw({ type: 'image/*', limit: '5mb' }))
app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim())
  }
}))
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public', 'build')))

app.use(require('./routes'))
app.get(/[a-z0-9]*/, function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'))
})

app.use(notFound)
app.use(productionErrors)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})
