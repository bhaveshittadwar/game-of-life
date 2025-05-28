const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

// set 'ejs' as the view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})