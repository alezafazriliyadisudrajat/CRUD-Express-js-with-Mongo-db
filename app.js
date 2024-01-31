const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const db = require('./app/models/')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log('Database connected success!')
    }).catch((err) => {
        console.log('Cannot connect to database!', err)
        process.exit()
    });

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to my project"
    })
})

require('./app/routes/post.routes')(app)

const PORT = 8000
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:8000')
})