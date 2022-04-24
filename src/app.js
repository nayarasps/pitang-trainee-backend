const express = require("express");
const helmet = require('helmet');
const cors = require('cors')
const routes = require("./routes/routes.js");

const app = express()
const PORT = 8080;

app.use(express.json());
app.use(cors())
app.use(helmet())

app.use('/api',routes)

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}


module.exports = app