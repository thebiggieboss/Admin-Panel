const bodyParser = require('body-parser')
const app = require('express')()
let lang = require('../static/i18n.json')
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json(lang)
})
app.post('/', (req, res) => {
  lang = req.body
  res.json({
    success: true,
    data: [],
    message: 'success'
  })
})

module.exports = app
