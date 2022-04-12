const express = require("express");
const helmet = require('helmet');
const routes = require("./routes/routes.js");

const app = express()
const PORT = 8080;

app.use(express.json());

app.use(helmet())
app.use('/api',routes)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
