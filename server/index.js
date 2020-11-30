const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')

app.use(require('express').json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

//404 handler
app.use((req, res, next) => {
    const error = Error(`Page not found(${req.url})`)
    error.status = 404
    next(error)
})

//500 handler
app.use((err, req, res, next) => {
    console.log(err, err.stack);
    res.status(err.status || 500).send(err.message || 'Internal Server Error')
  })


const port = process.env.PORT || 8080;

const init = () => {
  try {
    app.listen(port, () => console.log(`listening on port ${port}`));
  }
  catch (err) {
    console.log(err);
  }
}

init();
