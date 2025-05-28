const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const path = require('path')

// Allow embedding on your portfolio domain
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOW-FROM https://bhaveshittadwar.com'); // optional: legacy browsers
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://bhaveshittadwar.com https://*.vercel.app");
  next();
});

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
